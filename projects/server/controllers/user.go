package controller

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

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

	user, err := c.userService.RegisterUser(user)
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

	util.ResponseJSON(ctx.Writer, constant.ResCreated201, JWT, http.StatusCreated)
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

	user, err := c.userService.GetOneById(int32(userIdInt))
	if err != nil {
		err := apperror.NotFound(apperror.ErrUserNotFound404.Error())
		ctx.Error(err)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, user, http.StatusOK)
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

func (c *UserController) UpdateProfile(ctx *gin.Context) {
	ctx.Header("Content-Type", "application/json")

	authToken := ctx.GetHeader("Authorization")
	token := strings.Split(authToken, " ")[1]
	if token == "" {
		err := apperror.Unauthorized(apperror.ErrAuthJWT404.Error())
		ctx.Error(err)
		return
	}

	updateRequest := &entity.AcceptedUpdateProfilePayload{}
	if err := ctx.ShouldBind(updateRequest); err != nil {
		err := apperror.BadRequest(apperror.ErrPayloadIncomplete400.Error())
		ctx.Error(err)
		return
	}

	if updateRequest.Avatar != nil {
		file, err := ctx.FormFile("avatar")
		if err != nil {
			err := apperror.BadRequest(apperror.ErrAvatar400.Error())
			ctx.Error(err)
			return
		}

		allowedExtensions := [5]string{".jpg", ".jpeg", ".png", ".webp", ".gif"}
		var validExtension bool
		for _, ext := range allowedExtensions {
			if strings.HasSuffix(file.Filename, ext) {
				validExtension = true
				break
			}
		}
		if !validExtension {
			err := apperror.BadRequest(apperror.ErrAvatarFormat400.Error())
			ctx.Error(err)
			return
		}

		if file.Size > (2 * 1024 * 1024) {
			err := apperror.BadRequest(apperror.ErrAvatarSize400.Error())
			ctx.Error(err)
			return
		}

		filename := util.GenerateRandomFilename("AVIMG-", filepath.Ext(file.Filename))
		if err := ctx.SaveUploadedFile(file, filepath.Join("public/avatars", filename)); err != nil {
			err := apperror.InternalServerError()
			ctx.Error(err)
			return
		}

		updateRequest.FileName = &filename
	}

	if (updateRequest.Email == nil || *updateRequest.Email == "") && (updateRequest.DisplayName == nil || *updateRequest.DisplayName == "") && updateRequest.Avatar == nil {
		err := apperror.BadRequest(apperror.ErrNoUpdate400.Error())
		ctx.Error(err)
		return
	}

	isInfoUpdated, isAvatarUpdated, err := c.userService.UpdateProfile(token, updateRequest)
	if err != nil || (!isInfoUpdated && !isAvatarUpdated) {
		ctx.Error(err)
		return
	}

	if !isInfoUpdated && isAvatarUpdated {
		util.ResponseJSON(ctx.Writer, constant.ResOk200, constant.ResAvatarUpdated200, http.StatusOK)
		return
	}

	util.ResponseJSON(ctx.Writer, constant.ResOk200, constant.ResProfileUpdated200, http.StatusOK)
}

func (c *UserController) GetAvatar(ctx *gin.Context) {
	userId := ctx.Param("id")
	userIdInt, err := strconv.Atoi(userId)
	if err != nil {
		err := apperror.BadRequest(apperror.ErrParamInvalidId400.Error())
		ctx.Error(err)
		return
	}

	user, err := c.userService.GetOneById(int32(userIdInt))
	if err != nil {
		err := apperror.BadRequest(apperror.ErrUserNotFound404.Error())
		ctx.Error(err)
		return
	}

	ctx.File(filepath.Join("public/avatars", user.Avatar))
}
