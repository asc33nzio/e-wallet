// Code generated by mockery v2.10.4. DO NOT EDIT.

package mocks

import (
	entity "e-wallet/entities"

	mock "github.com/stretchr/testify/mock"

	time "time"
)

// UserService is an autogenerated mock type for the UserService type
type UserService struct {
	mock.Mock
}

// GetOneByEmail provides a mock function with given fields: email
func (_m *UserService) GetOneByEmail(email string) (*entity.UserCompact, error) {
	ret := _m.Called(email)

	var r0 *entity.UserCompact
	if rf, ok := ret.Get(0).(func(string) *entity.UserCompact); ok {
		r0 = rf(email)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.UserCompact)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(email)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetOneById provides a mock function with given fields: userId
func (_m *UserService) GetOneById(userId int32) (*entity.UserCompact, error) {
	ret := _m.Called(userId)

	var r0 *entity.UserCompact
	if rf, ok := ret.Get(0).(func(int32) *entity.UserCompact); ok {
		r0 = rf(userId)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.UserCompact)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(int32) error); ok {
		r1 = rf(userId)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Login provides a mock function with given fields: credentials
func (_m *UserService) Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error) {
	ret := _m.Called(credentials)

	var r0 *entity.User
	if rf, ok := ret.Get(0).(func(*entity.AcceptedLoginPayload) *entity.User); ok {
		r0 = rf(credentials)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.User)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(*entity.AcceptedLoginPayload) error); ok {
		r1 = rf(credentials)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewResetRequest provides a mock function with given fields: userId, newToken
func (_m *UserService) NewResetRequest(userId int32, newToken *string) (*time.Time, error) {
	ret := _m.Called(userId, newToken)

	var r0 *time.Time
	if rf, ok := ret.Get(0).(func(int32, *string) *time.Time); ok {
		r0 = rf(userId, newToken)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*time.Time)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(int32, *string) error); ok {
		r1 = rf(userId, newToken)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// RegisterUser provides a mock function with given fields: user
func (_m *UserService) RegisterUser(user *entity.User) (*entity.User, error) {
	ret := _m.Called(user)

	var r0 *entity.User
	if rf, ok := ret.Get(0).(func(*entity.User) *entity.User); ok {
		r0 = rf(user)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.User)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(*entity.User) error); ok {
		r1 = rf(user)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ResetPassword provides a mock function with given fields: token, arp
func (_m *UserService) ResetPassword(token string, arp *entity.AcceptedResetPayload) error {
	ret := _m.Called(token, arp)

	var r0 error
	if rf, ok := ret.Get(0).(func(string, *entity.AcceptedResetPayload) error); ok {
		r0 = rf(token, arp)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}
