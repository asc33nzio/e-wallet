// Code generated by mockery v2.10.4. DO NOT EDIT.

package mocks

import (
	entity "e-wallet/entities"

	mock "github.com/stretchr/testify/mock"

	time "time"
)

// UserRepository is an autogenerated mock type for the UserRepository type
type UserRepository struct {
	mock.Mock
}

// CreateUser provides a mock function with given fields: user
func (_m *UserRepository) CreateUser(user *entity.User) (*entity.User, error) {
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

// FindExistingToken provides a mock function with given fields: userId
func (_m *UserRepository) FindExistingToken(userId int32) *string {
	ret := _m.Called(userId)

	var r0 *string
	if rf, ok := ret.Get(0).(func(int32) *string); ok {
		r0 = rf(userId)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*string)
		}
	}

	return r0
}

// FindOneByEmail provides a mock function with given fields: email
func (_m *UserRepository) FindOneByEmail(email string) (*entity.UserCompact, error) {
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

// FindOneById provides a mock function with given fields: userId
func (_m *UserRepository) FindOneById(userId int32) (*entity.UserCompact, error) {
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

// InvalidateExistingRecord provides a mock function with given fields: userId
func (_m *UserRepository) InvalidateExistingRecord(userId int32) error {
	ret := _m.Called(userId)

	var r0 error
	if rf, ok := ret.Get(0).(func(int32) error); ok {
		r0 = rf(userId)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Login provides a mock function with given fields: credentials
func (_m *UserRepository) Login(credentials *entity.AcceptedLoginPayload) (*entity.User, error) {
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

// RecordResetRequest provides a mock function with given fields: userId, newToken
func (_m *UserRepository) RecordResetRequest(userId int32, newToken *string) (*time.Time, error) {
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

// UpdatePassword provides a mock function with given fields: userId, newPassword
func (_m *UserRepository) UpdatePassword(userId int32, newPassword string) error {
	ret := _m.Called(userId, newPassword)

	var r0 error
	if rf, ok := ret.Get(0).(func(int32, string) error); ok {
		r0 = rf(userId, newPassword)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}