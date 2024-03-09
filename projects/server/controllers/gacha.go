package controller

import (
	"net/http"
	"strconv"

	"e-wallet/apperrors"
	"e-wallet/constants"
	"e-wallet/services"
	"e-wallet/utils"

	"github.com/gin-gonic/gin"
)

type GachaController struct {
	gachaService service.GachaService
}

func NewGachaController(gachaService service.GachaService) *GachaController {
	return &GachaController{
		gachaService: gachaService,
	}
}

func (c *GachaController) GetAllBoxes(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	boxes, err := c.gachaService.GetGachaBoxes()
	if err != nil {
		err := apperror.InternalServerError()
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, boxes, http.StatusOK)
}

func (c *GachaController) ClaimReward(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	uid := ctx.Param("id")
	uidInt, err := strconv.Atoi(uid)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	response, err := c.gachaService.Play(int32(uidInt))
	if err != nil {
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, response, http.StatusOK)
}
