package service

import (
	"e-wallet/apperrors"
	"e-wallet/constants"
	"e-wallet/entities"
	"e-wallet/logger"
	"e-wallet/repositories"
	"e-wallet/validator"
)

type WalletService interface {
	FindOneUser(userId int32) (*entity.UserCompact, error)
	TopUp(payload entity.AcceptedTxPayload) (*entity.UserCompact, *entity.TransactionRecord, string, error)
	Transfer(payload entity.AcceptedTxPayload) (*entity.UserCompact, *entity.TransactionRecord, error)
	ViewTransactionsList(userId int32, searchQ string, recipientQ string, from string, until string, sortBy string, sortOrder string, limit int32, currentPage int32) (transactions *[]entity.TransactionRedacted, totalPages int32, err error)
}

type WalletServiceImpl struct {
	walletRepository repository.WalletRepository
	validator        *validator.Validator
}

func NewWalletServiceImpl(walletRepository repository.WalletRepository) *WalletServiceImpl {
	return &WalletServiceImpl{
		walletRepository: walletRepository,
		validator:        validator.NewValidatorImpl(),
	}
}

func (s *WalletServiceImpl) FindOneUser(userId int32) (*entity.UserCompact, error) {
	user, err := s.walletRepository.FindOneUser(userId)
	if err != nil {
		return nil, err
	}

	return user, err
}

func (s *WalletServiceImpl) TopUp(payload entity.AcceptedTxPayload) (*entity.UserCompact, *entity.TransactionRecord, string, error) {
	user, err := s.walletRepository.FindOneUser(payload.RecipientId)
	if err != nil {
		logger.Error(apperror.ErrUserNotFound404.Error())
		return nil, nil, "", apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	if payload.SenderId != payload.RecipientId {
		logger.Error(apperror.ErrTopUpDiffId400.Error())
		return nil, nil, "", apperror.BadRequest(apperror.ErrTopUpDiffId400.Error())
	}

	if err := s.validator.Validate.Var(payload.Amount, "required,gte=50000,lte=10000000"); err != nil {
		logger.Error(apperror.ErrPayloadAmount400.Error())
		return nil, nil, "", apperror.BadRequest(apperror.ErrPayloadAmount400.Error())
	}

	err = s.walletRepository.CreditBalance(payload.RecipientId, payload.Amount)
	if err != nil {
		logger.Error(apperror.ErrInternal500.Error())
		return nil, nil, "", apperror.InternalServerError()
	}

	message := "top up success"
	if payload.Amount == 10000000 {
		err := s.walletRepository.AddGachaAttempt(payload.RecipientId)
		if err != nil {
			logger.Error(apperror.ErrInternal500.Error())
			return nil, nil, "", apperror.InternalServerError()
		}
		message = constant.ResGacha200
	}

	tx, err := s.walletRepository.RecordActivity(
		payload.SenderId,
		payload.RecipientId,
		payload.Amount,
		payload.Description,
		payload.Source,
		user.Wallet.WalletNumber,
		user.Wallet.WalletNumber,
	)
	if err != nil {
		logger.Error(err.Error())
		return nil, nil, "", err
	}

	user.Wallet.Balance = user.Wallet.Balance + payload.Amount

	return user, tx, message, nil
}

func (s *WalletServiceImpl) Transfer(payload entity.AcceptedTxPayload) (*entity.UserCompact, *entity.TransactionRecord, error) {
	sender, err := s.walletRepository.FindOneUser(payload.SenderId)
	if err != nil {
		logger.Error(apperror.ErrUserNotFound404.Error())
		return nil, nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	if err := s.validator.Validate.Var(payload.AccountNumber, "validateString"); err != nil {
		logger.Error(apperror.ErrPayloadAccNum400.Error())
		return nil, nil, apperror.BadRequest(apperror.ErrPayloadAccNum400.Error())
	}

	recipient, err := s.walletRepository.FindOneWallet(payload.AccountNumber)
	if err != nil {
		logger.Error(apperror.ErrAccountNotFound404.Error())
		return nil, nil, apperror.NotFound(apperror.ErrAccountNotFound404.Error())
	}

	payload.RecipientId = recipient.Id
	payload.Source = "wallet"

	if payload.SenderId == payload.RecipientId {
		logger.Error(apperror.ErrTransferSameId400.Error())
		return nil, nil, apperror.BadRequest(apperror.ErrTransferSameId400.Error())
	}

	if err := s.validator.Validate.Var(payload.Amount, "required,gte=1000,lte=50000000"); err != nil {
		logger.Error(apperror.ErrPayloadAmount400.Error())
		return nil, nil, apperror.BadRequest(apperror.ErrPayloadTransferAmount400.Error())
	}

	err = s.walletRepository.DebitBalance(payload.SenderId, payload.Amount)
	if err != nil {
		logger.Error(err.Error())
		return nil, nil, err
	}

	err = s.walletRepository.CreditBalance(payload.RecipientId, payload.Amount)
	if err != nil {
		logger.Error(err.Error())
		return nil, nil, err
	}

	tx, err := s.walletRepository.RecordActivity(
		payload.SenderId,
		payload.RecipientId,
		payload.Amount,
		payload.Description,
		payload.Source,
		sender.Wallet.WalletNumber,
		recipient.Wallet.WalletNumber,
	)
	if err != nil {
		logger.Error(err.Error())
		return nil, nil, err
	}

	sender.Wallet.Balance = sender.Wallet.Balance - payload.Amount

	return sender, tx, nil
}

func (s *WalletServiceImpl) ViewTransactionsList(userId int32, searchQ string, recipientQ string, from string, until string, sortBy string, sortOrder string, limit int32, currentPage int32) (transactions *[]entity.TransactionRedacted, totalPages int32, err error) {
	transactions, totalPage, err := s.walletRepository.GetTxRecords(
		userId,
		searchQ,
		recipientQ,
		from,
		until,
		sortBy,
		sortOrder,
		limit,
		currentPage)
	if err != nil {
		logger.Error(err.Error())
		return nil, 0, err
	}

	return transactions, totalPage, nil
}
