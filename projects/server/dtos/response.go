package dto

import "e-wallet/entities"

type Response struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type ResponseTx struct {
	Remark            string                    `json:"remark"`
	User              *entity.UserCompact       `json:"userInfo"`
	TransactionDetail *entity.TransactionRecord `json:"transactionDetail"`
}

type ResponseTxHistory struct {
	AccountInfo       *entity.UserCompact           `json:"accountInfo"`
	PaginationInfo    PaginationInfo                `json:"paginationInfo"`
	TransactionDetail *[]entity.TransactionRedacted `json:"transactionHistory"`
}

type ResponseForget struct {
	Notice string `json:"notice"`
	JWT    string `json:"jwt"`
}

type ResponseGacha struct {
	Notice          string  `json:"notice"`
	AttemptsLeft    int32   `json:"attemptsLeft"`
	PreviousBalance float64 `json:"previousBalance"`
	CurrentBalance  float64 `json:"currentBalance"`
}

type PaginationInfo struct {
	CurrentPage  int32 `json:"currentPage"`
	EntryPerPage int32 `json:"entryPerpage"`
	TotalEntries int32 `json:"totalEntries"`
	TotalPages   int32 `json:"totalPages"`
}
