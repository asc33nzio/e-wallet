// Code generated by mockery v2.10.4. DO NOT EDIT.

package mocks

import (
	entity "e-wallet/entities"

	mock "github.com/stretchr/testify/mock"
)

// WalletRepository is an autogenerated mock type for the WalletRepository type
type WalletRepository struct {
	mock.Mock
}

// AddGachaAttempt provides a mock function with given fields: userId
func (_m *WalletRepository) AddGachaAttempt(userId int32) error {
	ret := _m.Called(userId)

	var r0 error
	if rf, ok := ret.Get(0).(func(int32) error); ok {
		r0 = rf(userId)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// CreditBalance provides a mock function with given fields: uid, amount
func (_m *WalletRepository) CreditBalance(uid int32, amount float64) error {
	ret := _m.Called(uid, amount)

	var r0 error
	if rf, ok := ret.Get(0).(func(int32, float64) error); ok {
		r0 = rf(uid, amount)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// DebitBalance provides a mock function with given fields: uid, amount
func (_m *WalletRepository) DebitBalance(uid int32, amount float64) error {
	ret := _m.Called(uid, amount)

	var r0 error
	if rf, ok := ret.Get(0).(func(int32, float64) error); ok {
		r0 = rf(uid, amount)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// FindOneUser provides a mock function with given fields: userId
func (_m *WalletRepository) FindOneUser(userId int32) (*entity.UserCompact, error) {
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

// FindOneWallet provides a mock function with given fields: accountNumber
func (_m *WalletRepository) FindOneWallet(accountNumber string) (*entity.UserCompact, error) {
	ret := _m.Called(accountNumber)

	var r0 *entity.UserCompact
	if rf, ok := ret.Get(0).(func(string) *entity.UserCompact); ok {
		r0 = rf(accountNumber)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.UserCompact)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(accountNumber)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetTxRecords provides a mock function with given fields: userId, searchQ, recipientQ, from, until, sortBy, sortOrder, limit, currentPage
func (_m *WalletRepository) GetTxRecords(userId int32, searchQ string, recipientQ string, from string, until string, sortBy string, sortOrder string, limit int32, currentPage int32) (*[]entity.TransactionRedacted, int32, error) {
	ret := _m.Called(userId, searchQ, recipientQ, from, until, sortBy, sortOrder, limit, currentPage)

	var r0 *[]entity.TransactionRedacted
	if rf, ok := ret.Get(0).(func(int32, string, string, string, string, string, string, int32, int32) *[]entity.TransactionRedacted); ok {
		r0 = rf(userId, searchQ, recipientQ, from, until, sortBy, sortOrder, limit, currentPage)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*[]entity.TransactionRedacted)
		}
	}

	var r1 int32
	if rf, ok := ret.Get(1).(func(int32, string, string, string, string, string, string, int32, int32) int32); ok {
		r1 = rf(userId, searchQ, recipientQ, from, until, sortBy, sortOrder, limit, currentPage)
	} else {
		r1 = ret.Get(1).(int32)
	}

	var r2 error
	if rf, ok := ret.Get(2).(func(int32, string, string, string, string, string, string, int32, int32) error); ok {
		r2 = rf(userId, searchQ, recipientQ, from, until, sortBy, sortOrder, limit, currentPage)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

// RecordActivity provides a mock function with given fields: senderId, recipientId, amount, description, source, senderAccount, recipientAccount
func (_m *WalletRepository) RecordActivity(senderId int32, recipientId int32, amount float64, description string, source string, senderAccount string, recipientAccount string) (*entity.TransactionRecord, error) {
	ret := _m.Called(senderId, recipientId, amount, description, source, senderAccount, recipientAccount)

	var r0 *entity.TransactionRecord
	if rf, ok := ret.Get(0).(func(int32, int32, float64, string, string, string, string) *entity.TransactionRecord); ok {
		r0 = rf(senderId, recipientId, amount, description, source, senderAccount, recipientAccount)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*entity.TransactionRecord)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(int32, int32, float64, string, string, string, string) error); ok {
		r1 = rf(senderId, recipientId, amount, description, source, senderAccount, recipientAccount)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}