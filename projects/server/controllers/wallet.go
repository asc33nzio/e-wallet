package controller

import (
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"e-wallet/apperrors"
	"e-wallet/constants"
	"e-wallet/dtos"
	"e-wallet/entities"
	"e-wallet/services"
	"e-wallet/utils"

	"github.com/gin-gonic/gin"
)

type WalletController struct {
	walletService service.WalletService
}

func NewWalletController(walletService service.WalletService) *WalletController {
	return &WalletController{
		walletService: walletService,
	}
}

func (c *WalletController) TopUpWallet(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	uidParam := ctx.Param("id")
	uidParamInt, err := strconv.Atoi(uidParam)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	var payload *entity.AcceptedTxPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	payload.SenderId = int32(uidParamInt)
	payload.RecipientId = int32(uidParamInt)

	uidJWT, ok := ctx.Get(constant.UserId)
	if !ok {
		err := apperror.Unauthorized(apperror.ErrAuth401.Error())
		ctx.Error(err)
		return
	}

	uidJWTInt32 := int32(uidJWT.(float64))
	if uidJWTInt32 != payload.SenderId {
		err := apperror.Forbidden(apperror.ErrAuth403.Error())
		ctx.Error(err)
		return
	}

	user, tx, msg, err := c.walletService.TopUp(*payload)
	if err != nil {
		ctx.Error(err)
		return
	}

	data := dto.ResponseTx{
		Remark:            msg,
		User:              user,
		TransactionDetail: tx,
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, data, http.StatusOK)
}

func (c *WalletController) Transfer(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	senderUidParam := ctx.Param("id")
	senderUidParamInt, err := strconv.Atoi(senderUidParam)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	var payload *entity.AcceptedTxPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	payload.SenderId = int32(senderUidParamInt)

	uidJWT, ok := ctx.Get(constant.UserId)
	if !ok {
		err := apperror.Unauthorized(apperror.ErrAuth401.Error())
		ctx.Error(err)
		return
	}

	uidJWTInt32 := int32(uidJWT.(float64))
	if uidJWTInt32 != payload.SenderId {
		err := apperror.Forbidden(apperror.ErrAuth403.Error())
		ctx.Error(err)
		return
	}

	user, tx, err := c.walletService.Transfer(*payload)
	if err != nil {
		ctx.Error(err)
		return
	}

	data := dto.ResponseTx{
		User:              user,
		TransactionDetail: tx,
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, data, http.StatusOK)
}

func (c *WalletController) TransactionHistory(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	uid := ctx.Param("id")
	uidInt, err := strconv.Atoi(uid)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	user, err := c.walletService.FindOneUser(int32(uidInt))
	if err != nil {
		ctx.Error(err)
		return
	}

	searchQ := ctx.Query("searchQ")
	recipientQ := ctx.Query("recipientQ")

	from := ctx.Query("from")
	from = strings.Trim(from, "\"")
	if from != "" {
		_, err := time.Parse("2006-01-02", from)
		if err != nil {
			err := apperror.BadRequest(apperror.ErrQueryInvalidDate400.Error())
			ctx.Error(err)
			return
		}
	}

	until := ctx.Query("until")
	until = strings.Trim(until, "\"")
	if until != "" {
		_, err := time.Parse("2006-01-02", until)
		if err != nil {
			err := apperror.BadRequest(apperror.ErrQueryInvalidDate400.Error())
			ctx.Error(err)
			return
		}
	}

	sortBy := ctx.Query("sortBy")
	sortByLower := strings.ToLower(sortBy)
	validSortQueries := map[string]bool{
		"amount":        true,
		"sourceoffunds": true,
		"createdat":     true,
	}
	if sortBy != "" && !validSortQueries[sortByLower] {
		err := apperror.BadRequest(apperror.ErrQueryInvalidSortBy400.Error())
		ctx.Error(err)
		return
	}

	sortOrder := ctx.Query("sortOrder")
	orderByLower := strings.ToLower(sortOrder)
	validOrderQueries := map[string]bool{
		"asc":  true,
		"desc": true,
	}
	if sortOrder != "" && !validOrderQueries[orderByLower] {
		err := apperror.BadRequest(apperror.ErrQueryInvalidSortOrder400.Error())
		ctx.Error(err)
		return
	}

	limit := ctx.Query("limit")
	limitInt, _ := strconv.Atoi(limit)
	if limitInt < 1 {
		limitInt = 10
	}

	currentPage := ctx.Query("currentPage")
	currentPageInt, _ := strconv.Atoi(currentPage)
	if currentPageInt < 1 {
		currentPageInt = 1
	}

	transactions, totalEntries, err := c.walletService.ViewTransactionsList(
		int32(uidInt),
		searchQ,
		recipientQ,
		from,
		until,
		sortByLower,
		orderByLower,
		int32(limitInt),
		int32(currentPageInt))

	if err != nil {
		ctx.Error(err)
		return
	}

	totalPages := int32(math.Ceil(float64(totalEntries) / float64(limitInt)))
	paginationInfo := dto.PaginationInfo{
		CurrentPage:  int32(currentPageInt),
		EntryPerPage: int32(limitInt),
		TotalEntries: totalEntries,
		TotalPages:   totalPages,
	}

	data := dto.ResponseTxHistory{
		AccountInfo:       user,
		PaginationInfo:    paginationInfo,
		TransactionDetail: transactions,
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, data, http.StatusOK)
}
