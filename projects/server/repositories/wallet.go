package repository

import (
	"database/sql"
	"strconv"
	"strings"
	"time"

	"e-wallet/apperrors"
	"e-wallet/entities"
)

type WalletRepository interface {
	FindOneUser(userId int32) (*entity.UserCompact, error)
	FindOneWallet(accountNumber string) (*entity.UserCompact, error)
	CreditBalance(uid int32, amount float64) error
	DebitBalance(uid int32, amount float64) error
	RecordActivity(senderId int32, recipientId int32, amount float64, description string, source string, senderAccount string, recipientAccount string) (*entity.TransactionRecord, error)
	GetTxRecords(userId int32, searchQ string, recipientQ string, from string, until string, sortBy string, sortOrder string, limit int32, currentPage int32) (transactions *[]entity.TransactionRedacted, totalPages int32, err error)
	AddGachaAttempt(userId int32) error
}

type walletRepositoryPostgres struct {
	db *sql.DB
}

func NewWalletRepositoryPostgres(db *sql.DB) *walletRepositoryPostgres {
	return &walletRepositoryPostgres{
		db: db,
	}
}

func (r *walletRepositoryPostgres) FindOneUser(userId int32) (*entity.UserCompact, error) {
	var user entity.UserCompact

	queryOneUser := `
		SELECT
			u.id,
			u.email,
			u.displayName,
			u.createdAt,
			u.updatedAt,
			u.deletedAt,
			w.id,
			w.walletNumber,
			w.balance,
			w.createdAt,
			w.updatedAt,
			w.deletedAt
		FROM
			users u
		JOIN
			wallets w
		ON
			u.id = w.userId
		WHERE
			u.id = $1;
		`

	err := r.db.QueryRow(queryOneUser, userId).Scan(
		&user.Id,
		&user.Email,
		&user.DisplayName,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.DeletedAt,
		&user.Wallet.Id,
		&user.Wallet.WalletNumber,
		&user.Wallet.Balance,
		&user.Wallet.CreatedAt,
		&user.Wallet.UpdatedAt,
		&user.Wallet.DeletedAt,
	)
	if err != nil {
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	return &user, nil
}

func (r *walletRepositoryPostgres) FindOneWallet(accountNumber string) (*entity.UserCompact, error) {
	var user entity.UserCompact

	queryOneUser := `
		SELECT
			u.id,
			u.email,
			u.displayName,
			u.createdAt,
			u.updatedAt,
			u.deletedAt,
			w.id,
			w.walletNumber,
			w.balance,
			w.createdAt,
			w.updatedAt,
			w.deletedAt
		FROM
			users u
		JOIN
			wallets w
		ON
			u.id = w.userId
		WHERE
			w.walletNumber = $1;
		`

	err := r.db.QueryRow(queryOneUser, accountNumber).Scan(
		&user.Id,
		&user.Email,
		&user.DisplayName,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.DeletedAt,
		&user.Wallet.Id,
		&user.Wallet.WalletNumber,
		&user.Wallet.Balance,
		&user.Wallet.CreatedAt,
		&user.Wallet.UpdatedAt,
		&user.Wallet.DeletedAt,
	)
	if err != nil {
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	return &user, nil
}

func (r *walletRepositoryPostgres) CreditBalance(uid int32, amount float64) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec("SELECT * FROM wallets WHERE userId = $1 FOR UPDATE;", uid)
	if err != nil {
		return err
	}

	queryAddBalance := `
        UPDATE
            wallets
        SET
            balance = (balance + $1)
        WHERE
            userId = $2;
    	`
	if _, err := tx.Exec(queryAddBalance, amount, uid); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}

func (r *walletRepositoryPostgres) DebitBalance(uid int32, amount float64) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec("SELECT * FROM wallets WHERE userId = $1 FOR UPDATE;", uid)
	if err != nil {
		return err
	}

	var currentBalance float64
	err = tx.QueryRow("SELECT balance FROM wallets WHERE userId = $1;", uid).Scan(&currentBalance)
	if err != nil {
		return err
	}
	if currentBalance < amount {
		return apperror.BadRequest(apperror.ErrInsufficientFunds400.Error())
	}

	queryDeductBalance := `
        UPDATE
            wallets
        SET
            balance = (balance - $1)
        WHERE
            userId = $2;
    	`
	if _, err := tx.Exec(queryDeductBalance, amount, uid); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}

func (r *walletRepositoryPostgres) RecordActivity(senderId int32, recipientId int32, amount float64, description string, source string, senderAccount string, recipientAccount string) (*entity.TransactionRecord, error) {
	allowedSources := map[string]bool{
		"cash":     true,
		"wallet":   true,
		"transfer": true,
		"cc":       true,
		"paylater": true,
		"gacha":    true,
	}

	sanitizedSource := strings.ToLower(source)
	if !allowedSources[sanitizedSource] {
		return nil, apperror.BadRequest(apperror.ErrPayloadInvalidSource400.Error())
	}

	queryRecordTx := `
		INSERT INTO
			transactions (
				senderId,
				recipientId,
				amount,
				sourceOfFunds,
				description
			)
		VALUES(
			$1, $2, $3, $4, $5)
		RETURNING
			id, createdAt, updatedAt, deletedAt;
		`

	var descriptionToRecord string

	if senderId == recipientId {
		switch {
		case sanitizedSource == "cash" ||
			sanitizedSource == "transfer" ||
			sanitizedSource == "cc" ||
			sanitizedSource == "gacha":
			descriptionToRecord = "Top Up from " + sanitizedSource
		default:
			return nil, apperror.BadRequest(apperror.ErrPayloadInvalidSource400.Error())
		}
	} else {
		switch {
		case sanitizedSource == "wallet" || sanitizedSource == "paylater":
			if description != "" {
				descriptionToRecord = description
				break
			}
			descriptionToRecord = "Transfer from " + senderAccount + " to " + recipientAccount
		default:
			return nil, apperror.BadRequest(apperror.ErrPayloadInvalidSource400.Error())
		}
	}

	var txId int32
	var createdAt, updatedAt, deletedAt *time.Time
	err := r.db.QueryRow(
		queryRecordTx,
		senderId,
		recipientId,
		amount,
		sanitizedSource,
		descriptionToRecord,
	).Scan(
		&txId,
		&createdAt,
		&updatedAt,
		&deletedAt,
	)
	if err != nil {
		return nil, err
	}

	tr := entity.TransactionRecord{
		Id:            txId,
		SenderId:      senderId,
		RecipientId:   recipientId,
		Amount:        amount,
		SourceOfFunds: sanitizedSource,
		Description:   descriptionToRecord,
		CreatedAt:     createdAt,
		UpdatedAt:     updatedAt,
		DeletedAt:     deletedAt,
	}

	return &tr, nil
}

func (r *walletRepositoryPostgres) GetTxRecords(userId int32, searchQ string, recipientQ string, from string, until string, sortBy string, sortOrder string, limit int32, currentPage int32) (transactions *[]entity.TransactionRedacted, totalPages int32, err error) {
	var queryBuilder strings.Builder
	queryBuilder.WriteString(`
        SELECT
            tx.id,
            tx.senderId,
            tx.recipientId,
            tx.amount,
            tx.sourceOfFunds,
            tx.description,
            tx.createdAt,
            sender.displayName,
            recipient.displayName,
            walletSender.walletNumber,
            walletRecipient.walletNumber,
			COUNT(*) OVER() AS total_count
        FROM
            transactions tx
        JOIN
            users sender
        ON 
            tx.senderId = sender.id
        JOIN
            users recipient
        ON 
            tx.recipientId = recipient.id
        JOIN
            wallets walletSender
        ON
            sender.id = walletSender.UserId
        JOIN
            wallets walletRecipient
        ON
			recipient.id = walletRecipient.UserId
		WHERE
			(tx.senderId = $1 OR tx.recipientId = $1)
    `)

	params := []interface{}{userId}
	if recipientQ != "" {
		queryBuilder.WriteString(" AND walletRecipient.walletNumber = $" + strconv.Itoa(len(params)+1) + " ")
		params = append(params, recipientQ)
	}

	if searchQ != "" {
		queryBuilder.WriteString(" AND tx.description ILIKE $" + strconv.Itoa(len(params)+1) + " ")
		params = append(params, "%"+searchQ+"%")
	}

	if from != "" {
		queryBuilder.WriteString(" AND tx.createdAt >= $" + strconv.Itoa(len(params)+1) + " ")
		params = append(params, from)
	}

	if until != "" {
		queryBuilder.WriteString(" AND tx.createdAt <= $" + strconv.Itoa(len(params)+1) + " ")
		params = append(params, until)
	}

	queryBuilder.WriteString(" ORDER BY ")
	if sortBy != "" {
		queryBuilder.WriteString(sortBy)
	} else {
		queryBuilder.WriteString("tx.createdAt")
	}
	if sortOrder != "" {
		queryBuilder.WriteString(" " + sortOrder)
	} else {
		queryBuilder.WriteString(" DESC")
	}

	offset := ((currentPage - 1) * limit)
	queryBuilder.WriteString(" LIMIT $" + strconv.Itoa(len(params)+1) + " OFFSET $" + strconv.Itoa(len(params)+2))
	params = append(params, limit, offset)

	query := queryBuilder.String()

	rows, err := r.db.Query(query, params...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var records []entity.TransactionRedacted
	var totalRecords int32
	for rows.Next() {
		var record entity.TransactionRedacted

		err := rows.Scan(
			&record.Id,
			&record.SenderId,
			&record.RecipientId,
			&record.Amount,
			&record.SourceOfFunds,
			&record.Description,
			&record.TxTime,
			&record.Sender.DisplayName,
			&record.Recipient.DisplayName,
			&record.Sender.Wallet.WalletNumber,
			&record.Recipient.Wallet.WalletNumber,
			&totalRecords,
		)
		if err != nil {
			return nil, 0, err
		}

		records = append(records, record)
	}

	return &records, totalRecords, nil
}

func (r *walletRepositoryPostgres) AddGachaAttempt(userId int32) error {
	queryAddAttempt := `
		INSERT INTO
    		user_attempts (userId, remaining)
		VALUES
    		($1, 1)
		ON CONFLICT 
			(userId)
		DO UPDATE SET
    		remaining = user_attempts.remaining + 1
		WHERE
    		user_attempts.userId = $1;
		`

	_, err := r.db.Exec(queryAddAttempt, userId)
	if err != nil {
		return err
	}

	return nil
}