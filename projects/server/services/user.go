package service

import (
	"e-wallet/apperrors"
	"e-wallet/entities"
	"e-wallet/logger"
	"e-wallet/repositories"
	"e-wallet/utils"
	"e-wallet/validator"

	"time"
)

type UserService interface {
	RegisterUser(user *entity.User) (*entity.User, error)
	Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error)
	GetOneById(userId int32) (*entity.UserCompact, error)
	GetOneByEmail(email string) (*entity.UserCompact, error)
	NewResetRequest(userId int32, newToken *string) (*time.Time, error)
	ResetPassword(token string, arp *entity.AcceptedResetPayload) error
}

type UserServiceImpl struct {
	userRepository repository.UserRepository
	validator      *validator.Validator
}

func NewUserServiceImpl(userRepository repository.UserRepository) *UserServiceImpl {
	return &UserServiceImpl{
		userRepository: userRepository,
		validator:      validator.NewValidatorImpl(),
	}
}

func (s *UserServiceImpl) RegisterUser(user *entity.User) (*entity.User, error) {
	if err := s.validator.Validate.Var(user.Email, "required,email"); err != nil {
		logger.Error(apperror.ErrPayloadEmailFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadEmailFormat400.Error())
	}
	if err := s.validator.Validate.Var(user.DisplayName, "required,gte=3"); err != nil {
		logger.Error(apperror.ErrPayloadNameFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadNameFormat400.Error())
	}
	if err := s.validator.Validate.Var(user.Password, "validatePassword"); err != nil {
		logger.Error(apperror.ErrPayloadPwdFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadPwdFormat400.Error())
	}

	user, err := s.userRepository.CreateUser(user)
	if err != nil {
		logger.Error(err.Error())
		return nil, err
	}

	return user, nil
}

func (s *UserServiceImpl) Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error) {
	if err := s.validator.Validate.Var(credentials.Email, "required,email"); err != nil {
		logger.Error(apperror.ErrPayloadEmailFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadEmailFormat400.Error())
	}
	if err := s.validator.Validate.Var(credentials.Password, "validatePassword"); err != nil {
		logger.Error(apperror.ErrPayloadPwdFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadPwdFormat400.Error())
	}

	user, err := s.userRepository.Login(credentials)
	if err != nil {
		logger.Error(err.Error())
		return nil, err
	}
	return user, nil
}

func (s *UserServiceImpl) GetOneById(userId int32) (*entity.UserCompact, error) {
	user, err := s.userRepository.FindOneById(userId)
	if err != nil {
		logger.Error(err.Error())
		return nil, err
	}
	return user, nil
}
func (s *UserServiceImpl) GetOneByEmail(email string) (*entity.UserCompact, error) {
	if err := s.validator.Validate.Var(email, "required,email"); err != nil {
		logger.Error(apperror.ErrPayloadEmailFormat400.Error())
		return nil, apperror.BadRequest(apperror.ErrPayloadEmailFormat400.Error())
	}

	user, err := s.userRepository.FindOneByEmail(email)
	if err != nil {
		logger.Error(err.Error())
		return nil, err
	}
	return user, nil
}

func (s *UserServiceImpl) NewResetRequest(userId int32, newToken *string) (*time.Time, error) {
	oldToken := s.userRepository.FindExistingToken(userId)
	if oldToken == nil {
		validUntil, err := s.userRepository.RecordResetRequest(userId, newToken)
		if err != nil {
			return nil, err
		}
		return validUntil, nil
	}

	err := s.userRepository.InvalidateExistingRecord(userId)
	if err != nil {
		return nil, err
	}

	validUntil, err := s.userRepository.RecordResetRequest(userId, newToken)
	if err != nil {
		return nil, err
	}

	return validUntil, nil
}

func (s *UserServiceImpl) ResetPassword(token string, arp *entity.AcceptedResetPayload) error {
	claims, err := util.ParseAndVerify(token)
	if err != nil {
		return apperror.BadRequest(apperror.ErrParamInvalidJWT400.Error())
	}

	uid, ok := claims["uid"].(float64)
	if !ok {
		return apperror.Unauthorized(apperror.ErrAuth401.Error())
	}

	user, err := s.userRepository.FindOneById(int32(uid))
	if err != nil {
		return apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	proposedUser, err := s.userRepository.FindOneByEmail(arp.Email)
	if err != nil {
		return apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	if user.Email != proposedUser.Email {
		return apperror.Unauthorized(apperror.ErrAuth403.Error())
	}

	storedToken := s.userRepository.FindExistingToken(int32(uid))
	if storedToken == nil || token != string(*storedToken) {
		logger.Error(apperror.ErrAuthJWT400.Error())
		return apperror.BadRequest(apperror.ErrAuthJWT400.Error())
	}

	if err = s.validator.Validate.Var(arp.Email, "required,email"); err != nil {
		logger.Error(apperror.ErrPayloadEmailFormat400.Error())
		return apperror.BadRequest(apperror.ErrPayloadEmailFormat400.Error())
	}

	if err := s.validator.Validate.Var(arp.Password, "validatePassword"); err != nil {
		logger.Error(apperror.ErrPayloadPwdFormat400.Error())
		return apperror.BadRequest(apperror.ErrPayloadPwdFormat400.Error())
	}

	if arp.Password != arp.ConfirmPassword {
		logger.Error(apperror.ErrPayloadPwdMatch400.Error())
		return apperror.BadRequest(apperror.ErrPayloadPwdMatch400.Error())
	}

	err = s.userRepository.UpdatePassword(int32(uid), arp.Password)
	if err != nil {
		return err
	}

	err = s.userRepository.InvalidateExistingRecord(int32(uid))
	if err != nil {
		return err
	}

	return nil
}
