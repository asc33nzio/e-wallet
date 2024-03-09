package service

import (
	"fmt"

	"e-wallet/apperrors"
	"e-wallet/dtos"
	"e-wallet/entities"
	"e-wallet/repositories"
	"e-wallet/validator"
)

type GachaService interface {
	GetGachaBoxes() ([]entity.GachaBox, error)
	Play(userId int32) (*dto.ResponseGacha, error)
}

type GachaServiceImpl struct {
	gachaRepository repository.GachaRepository
	validator       *validator.Validator
}

func NewGachaServiceImpl(gachaRepository repository.GachaRepository) *GachaServiceImpl {
	return &GachaServiceImpl{
		gachaRepository: gachaRepository,
		validator:       validator.NewValidatorImpl(),
	}
}

func (s *GachaServiceImpl) GetGachaBoxes() ([]entity.GachaBox, error) {
	boxes, err := s.gachaRepository.GetGachaList()
	if err != nil {
		return nil, err
	}

	return boxes, nil
}

func (s *GachaServiceImpl) Play(userId int32) (*dto.ResponseGacha, error) {
	user, err := s.gachaRepository.FindOneUserById(userId)
	if err != nil {
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}
	oldBalance := user.Wallet.Balance

	attemptRemaining, err := s.gachaRepository.CheckAttempt(user.Id)
	if err != nil {
		return nil, apperror.BadRequest(apperror.ErrGachaNoAttempt400.Error())
	}
	if attemptRemaining < 1 {
		return nil, apperror.BadRequest(apperror.ErrGachaNoAttempt400.Error())
	}

	boxes, err := s.gachaRepository.GetGachaList()
	if err != nil {
		return nil, err
	}

	reward, err := s.gachaRepository.ChooseBox(boxes)
	if err != nil {
		return nil, err
	}

	err = s.gachaRepository.CreditBalance(user.Id, float64(reward))
	if err != nil {
		return nil, err
	}

	err = s.gachaRepository.DeductAttempt(user.Id)
	if err != nil {
		return nil, err
	}

	err = s.gachaRepository.RecordGacha(user.Id, float64(reward))
	if err != nil {
		return nil, err
	}

	updatedUser, err := s.gachaRepository.FindOneUserById(userId)
	if err != nil {
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}
	newBalance := updatedUser.Wallet.Balance

	newAttemptRemaining, err := s.gachaRepository.CheckAttempt(user.Id)
	if err != nil {
		return nil, err
	}

	response := dto.ResponseGacha{
		Notice:          fmt.Sprintf("congratulations! you just won Rp. %v!", reward),
		AttemptsLeft:    newAttemptRemaining,
		PreviousBalance: oldBalance,
		CurrentBalance:  newBalance,
	}

	return &response, nil
}
