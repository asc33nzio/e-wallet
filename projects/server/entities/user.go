package entity

import (
	"mime/multipart"
	"time"
)

type User struct {
	Id          int32      `json:"id"`
	Email       string     `json:"email" form:"email" binding:"required"`
	DisplayName string     `json:"displayName" form:"displayName" binding:"required"`
	Avatar      string     `json:"avatar"`
	Password    string     `json:"password" form:"password" binding:"required"`
	CreatedAt   *time.Time `json:"createdAt"`
	UpdatedAt   *time.Time `json:"updatedAt"`
	DeletedAt   *time.Time `json:"deletedAt"`
	Wallet      Wallet
}

type UserCompact struct {
	Id          int32         `json:"id"`
	Email       string        `json:"email"`
	DisplayName string        `json:"displayName"`
	Avatar      string        `json:"avatar"`
	CreatedAt   *time.Time    `json:"createdAt"`
	UpdatedAt   *time.Time    `json:"updatedAt"`
	DeletedAt   *time.Time    `json:"deletedAt"`
	Wallet      WalletCompact `json:"wallet"`
}

type UserRedacted struct {
	DisplayName string         `json:"displayName"`
	Wallet      WalletRedacted `json:"wallet"`
}

type AcceptedLoginPayload struct {
	Email    string `json:"email" form:"email" binding:"required"`
	Password string `json:"password" form:"password" binding:"required"`
}

type AcceptedForgetPayload struct {
	Email string `json:"email" form:"email" binding:"required"`
}

type AcceptedResetPayload struct {
	Email           string `json:"email" form:"email" binding:"required"`
	Password        string `json:"password" form:"password" binding:"required"`
	ConfirmPassword string `json:"confirmPassword" form:"confirmPassword" binding:"required"`
}

type AcceptedUpdateProfilePayload struct {
	Email       *string               `json:"email" form:"email"`
	DisplayName *string               `json:"displayName" form:"displayName"`
	Avatar      *multipart.FileHeader `json:"avatar" form:"avatar"`
	FileName    *string
}
