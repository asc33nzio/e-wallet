package repository

import (
	"e-wallet/apperrors"
	"e-wallet/entities"
	"e-wallet/utils"

	"database/sql"
	"time"
)

type UserRepository interface {
	FindOneById(userId int32) (*entity.UserCompact, error)
	FindOneByEmail(email string) (*entity.UserCompact, error)
	CreateUser(user *entity.User) (*entity.User, error)
	UpdatePassword(userId int32, newPassword string) error
	Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error)
	FindExistingToken(userId int32) (token *string)
	RecordResetRequest(userId int32, newToken *string) (*time.Time, error)
	InvalidateExistingRecord(userId int32) error
}

type userRepositoryPostgres struct {
	db *sql.DB
}

func NewUserRepositoryPostgres(db *sql.DB) *userRepositoryPostgres {
	return &userRepositoryPostgres{
		db: db,
	}
}

func (r *userRepositoryPostgres) FindOneById(userId int32) (*entity.UserCompact, error) {
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

func (r *userRepositoryPostgres) FindOneByEmail(email string) (*entity.UserCompact, error) {
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
			u.email = $1;
		`

	err := r.db.QueryRow(queryOneUser, email).Scan(
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

func (r *userRepositoryPostgres) CreateUser(user *entity.User) (*entity.User, error) {
	queryNewUser := `
		INSERT INTO
			users (
				email,
				displayName,
				password
			)
		VALUES
			($1, $2, $3)
		RETURNING
			id, createdAt, updatedAt;
		`

	hashedPwd, err := util.HashPassword(user.Password)
	if err != nil {
		return nil, apperror.InternalServerError()
	}
	user.Password = string(hashedPwd)

	var userId int32
	var createdAtUser, updatedAtUser time.Time
	err = r.db.QueryRow(
		queryNewUser,
		&user.Email,
		&user.DisplayName,
		&user.Password,
	).Scan(
		&userId,
		&createdAtUser,
		&updatedAtUser)
	if err != nil {
		return nil, apperror.BadRequest(apperror.ErrPayloadDupUser400.Error())
	}
	user.Id = userId
	user.CreatedAt = &createdAtUser
	user.UpdatedAt = &updatedAtUser

	var wallet entity.Wallet
	queryNewWallet := `
	INSERT INTO
		wallets (userId)
	VALUES
		($1)
	RETURNING
		id, walletNumber, balance, createdAt, updatedAt;
		`

	var walletId int32
	var walletNumber string
	var balance float64
	var createdAtWallet, updatedAtWallet time.Time
	err = r.db.QueryRow(
		queryNewWallet,
		&user.Id,
	).Scan(
		&walletId,
		&walletNumber,
		&balance,
		&createdAtWallet,
		&updatedAtWallet)
	if err != nil {
		return nil, apperror.InternalServerError()
	}
	wallet.Id = walletId
	wallet.WalletNumber = walletNumber
	wallet.Balance = balance
	wallet.CreatedAt = &createdAtWallet
	wallet.UpdatedAt = &updatedAtWallet
	user.Wallet = wallet

	return user, nil
}

func (r *userRepositoryPostgres) UpdatePassword(userId int32, newPassword string) error {
	queryUpdatePassword := `
		UPDATE
			users
		SET
			password = $1
		WHERE
			id = $2;
		`

	hashedPwd, err := util.HashPassword(newPassword)
	if err != nil {
		return apperror.InternalServerError()
	}

	_, err = r.db.Exec(
		queryUpdatePassword,
		string(hashedPwd),
		&userId)
	if err != nil {
		return err
	}

	return nil
}

func (r *userRepositoryPostgres) Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error) {
	queryLogin := `
		SELECT
			u.id,
			u.email,
			u.displayName,
			u.password,
			u.createdAt,
			u.updatedAt,
			u.deletedAt,
			w.id,
			w.walletNumber,
			w.balance
		FROM
			users u
		JOIN
			wallets w
		ON
			u.id = w.userId
		WHERE
			u.email = $1;
		`
	var user entity.User
	err := r.db.QueryRow(
		queryLogin,
		credentials.Email,
	).Scan(
		&user.Id,
		&user.Email,
		&user.DisplayName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.DeletedAt,
		&user.Wallet.Id,
		&user.Wallet.WalletNumber,
		&user.Wallet.Balance,
	)
	if err != nil {
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	isAuthenticated, err := util.CheckPassword(credentials.Password, []byte(user.Password))
	if !isAuthenticated {
		return nil, apperror.Unauthorized(apperror.ErrAuthPass401.Error())
	}
	if err != nil {
		return nil, apperror.InternalServerError()
	}

	return &user, nil
}

func (r *userRepositoryPostgres) FindExistingToken(userId int32) (token *string) {
	queryToken := `
		SELECT
			token
		FROM
			reset_tokens
		WHERE
			userId = $1 AND
			expiredAt >= NOW();
		`
	var resetToken string
	err := r.db.QueryRow(queryToken, userId).Scan(&resetToken)
	if err != nil {
		return nil
	}

	return &resetToken
}

func (r *userRepositoryPostgres) RecordResetRequest(userId int32, newToken *string) (*time.Time, error) {
	queryNewRecord := `
		INSERT INTO
			reset_tokens(
				userId,
				token
			)
		VALUES($1, $2)
		RETURNING expiredAt;
		`

	var validUntil time.Time
	err := r.db.QueryRow(queryNewRecord, userId, newToken).Scan(&validUntil)
	if err != nil {
		return nil, err
	}

	return &validUntil, nil
}

func (r *userRepositoryPostgres) InvalidateExistingRecord(userId int32) error {
	queryInvalidateExistingRecord := `
		UPDATE
			reset_tokens
		SET
			expiredAt = NOW()
		WHERE
			userId = $1 AND
			expiredAt >= NOW();
			`

	_, err := r.db.Exec(queryInvalidateExistingRecord, userId)
	if err != nil {
		return err
	}

	return nil
}
