package entity

import "time"

type Wallet struct {
	Id           int32
	UserId       int32
	WalletNumber string
	Balance      float64
	CreatedAt    *time.Time
	UpdatedAt    *time.Time
	DeletedAt    *time.Time
}

type WalletCompact struct {
	Id           int32      `json:"id"`
	WalletNumber string     `json:"walletNumber"`
	Balance      float64    `json:"balance"`
	CreatedAt    *time.Time `json:"createdAt"`
	UpdatedAt    *time.Time `json:"updatedAt"`
	DeletedAt    *time.Time `json:"deletedAt"`
}

type WalletRedacted struct {
	WalletNumber string `json:"walletNumber"`
}

type TransactionRecord struct {
	Id            int32      `json:"id"`
	SenderId      int32      `json:"senderId"`
	RecipientId   int32      `json:"recipientId"`
	Amount        float64    `json:"amount"`
	SourceOfFunds string     `json:"sourceOfFunds"`
	Description   string     `json:"description"`
	CreatedAt     *time.Time `json:"createdAt"`
	UpdatedAt     *time.Time `json:"updatedAt"`
	DeletedAt     *time.Time `json:"deletedAt"`
}

type TransactionRedacted struct {
	Id            int32        `json:"id"`
	SenderId      int32        `json:"senderId"`
	RecipientId   int32        `json:"recipientId"`
	Amount        float64      `json:"amount"`
	SourceOfFunds string       `json:"sourceOfFunds"`
	Description   string       `json:"description"`
	TxTime        *time.Time   `json:"txTime"`
	Sender        UserRedacted `json:"sender"`
	Recipient     UserRedacted `json:"recipient"`
}

type AcceptedTxPayload struct {
	SenderId      int32   `json:"senderId"`
	RecipientId   int32   `json:"recipientId"`
	AccountNumber string  `json:"accountNumber"`
	Amount        float64 `json:"amount" form:"amount" binding:"required"`
	Description   string  `json:"description" form:"description"`
	Source        string  `json:"sourceOfFunds"`
}

type GachaBox struct {
	Id     int32 `json:"id"`
	Amount int32 `json:"amount"`
}
