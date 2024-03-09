package repository

import (
	"database/sql"

	"e-wallet/apperrors"
	"e-wallet/entities"
	"e-wallet/utils"
)

type GachaRepository interface {
	FindOneUserById(userId int32) (*entity.UserCompact, error)
	GetGachaList() ([]entity.GachaBox, error)
	CheckAttempt(userId int32) (int32, error)
	DeductAttempt(userId int32) error
	ChooseBox(boxes []entity.GachaBox) (reward int32, err error)
	CreditBalance(uid int32, amount float64) error
	RecordGacha(userId int32, amount float64) error
}

type gachaRepositoryPostgres struct {
	db *sql.DB
}

func NewGachaRepositoryPostgres(db *sql.DB) *gachaRepositoryPostgres {
	return &gachaRepositoryPostgres{
		db: db,
	}
}

func (r *gachaRepositoryPostgres) FindOneUserById(userId int32) (*entity.UserCompact, error) {
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

func (r *gachaRepositoryPostgres) GetGachaList() ([]entity.GachaBox, error) {
	queryBoxes := `
		SELECT
			id,
			amount
		FROM
			gacha_boxes;
		`

	rows, err := r.db.Query(queryBoxes)
	if err != nil {
		return nil, err
	}

	var boxes []entity.GachaBox
	for rows.Next() {
		var box entity.GachaBox
		err := rows.Scan(
			&box.Id,
			&box.Amount)
		if err != nil {
			return nil, err
		}

		boxes = append(boxes, box)
	}

	return boxes, nil
}

func (r *gachaRepositoryPostgres) CheckAttempt(userId int32) (int32, error) {
	queryCheck := `
		SELECT
			remaining
		FROM
			user_attempts
		WHERE 
			userId = $1;
		`

	var attemptRemaining int32
	err := r.db.QueryRow(queryCheck, userId).Scan(&attemptRemaining)
	if err != nil {
		return 0, err
	}

	return attemptRemaining, nil
}

func (r *gachaRepositoryPostgres) DeductAttempt(userId int32) error {
	queryDeductAttempt := `
		UPDATE
			user_attempts
		SET
    		remaining = user_attempts.remaining - 1
		WHERE
    		userId = $1;
		`

	_, err := r.db.Exec(queryDeductAttempt, userId)
	if err != nil {
		return err
	}

	return nil
}

func (r *gachaRepositoryPostgres) ChooseBox(boxes []entity.GachaBox) (reward int32, err error) {
	RNG := util.RNG()

	if RNG >= len(boxes) {
		return 0, apperror.InternalServerError()
	}

	return boxes[RNG-1].Amount, nil
}

func (r *gachaRepositoryPostgres) CreditBalance(uid int32, amount float64) error {
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

func (r *gachaRepositoryPostgres) RecordGacha(userId int32, amount float64) error {
	queryRecordGachaTx := `
		INSERT INTO
			transactions (
				senderId,
				recipientId,
				amount,
				sourceOfFunds,
				description
			)
		VALUES(
			$1, $2, $3, 'gacha', 'reward claim');
		`

	_, err := r.db.Exec(
		queryRecordGachaTx,
		userId,
		userId,
		amount,
	)
	if err != nil {
		return err
	}

	return nil
}
