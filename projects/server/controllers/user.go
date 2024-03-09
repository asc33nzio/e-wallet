package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"e-wallet/apperrors"
	"e-wallet/constants"
	"e-wallet/dtos"
	"e-wallet/entities"
	"e-wallet/middlewares"
	"e-wallet/services"
	"e-wallet/utils"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService service.UserService
}

func NewUserController(userService service.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

func (c *UserController) RegisterUser(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	var user *entity.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	_, err := c.userService.RegisterUser(user)
	if err != nil {
		ctx.Error(err)
		return
	}
	util.ResponseJSON(ctx.Writer, constant.ResCreated201, nil, http.StatusCreated)
}

func (c *UserController) Login(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	var credentials *entity.AcceptedLoginPayload
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	user, err := c.userService.Login(credentials)
	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.Set(constant.UserId, user.Id)
	JWT, err := middleware.GenerateJWT(ctx)
	if err != nil {
		err := apperror.InternalServerError()
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, JWT, http.StatusOK)
}

func (c *UserController) GetOneUser(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	userId := ctx.Param("id")
	userIdInt, err := strconv.Atoi(userId)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	users, err := c.userService.GetOneById(int32(userIdInt))
	if err != nil {
		err := apperror.NotFound(apperror.ErrUserNotFound404.Error())
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, users, http.StatusOK)
}

func (c *UserController) ForgetPassword(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	var forgetRequest *entity.AcceptedForgetPayload
	if err := ctx.ShouldBindJSON(&forgetRequest); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	user, err := c.userService.GetOneByEmail(forgetRequest.Email)
	if err != nil {
		ctx.Error(err)
		return
	}
	
	resetToken, err := util.CreateAndSign(user.Id)
	if err != nil {
		util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
		ctx.Error(err)
		ctx.Abort()
		return
	}
	
	validUntil, err := c.userService.NewResetRequest(user.Id, &resetToken)
	if err != nil {
		ctx.Error(err)
		ctx.Abort()
		return
	}

	data := dto.ResponseForget{
		Notice: fmt.Sprintf("a reset password request has been sent to your e-mail. it is valid until: %v", validUntil),
		JWT:    resetToken,
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, data, http.StatusOK)
}

func (c *UserController) ResetPassword(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	var resetRequest *entity.AcceptedResetPayload
	if err := ctx.ShouldBindJSON(&resetRequest); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	token := ctx.Param("token")
	err := c.userService.ResetPassword(token, resetRequest)
	if err != nil {
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, constant.ResUpdated200, http.StatusOK)
}