package middleware

import (
	"net/http"
	"strconv"
	"strings"

	"e-wallet/apperrors"
	"e-wallet/constants"
	"e-wallet/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(ctx *gin.Context) (token *string, err error) {
	ctx.Next()

	uid, exists := ctx.Get(constant.UserId)
	if !exists {
		ctx.Abort()
		return nil, apperror.NotFound(apperror.ErrUserNotFound404.Error())
	}

	JWT, err := util.CreateAndSign(uid.(int32))
	if err != nil {
		ctx.Abort()
		return nil, err
	}
	ctx.Set(constant.JWT, JWT)

	return &JWT, nil
}

func ValidateJWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Header("Content-Type", "application/json")

		authorization := ctx.Request.Header.Get("Authorization")
		if authorization == "" {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		tokenString := strings.Split(authorization, " ")[1]
		userData, err := util.ParseAndVerify(tokenString)
		if err != nil {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuthJWT401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		ctx.Set(constant.UserData, userData)
		ctx.Next()
	}
}

func SetContext() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userData, exists := ctx.Get(constant.UserData)
		if !exists {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		claims, ok := userData.(jwt.MapClaims)
		if !ok {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		jwtUid, ok := claims["uid"].(float64)
		if !ok {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}
		ctx.Set(constant.UserId, jwtUid)

		ctx.Next()
	}
}

func ValidateCorrectUserParamEdp() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userData, exists := ctx.Get(constant.UserData)
		if !exists {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		claims, ok := userData.(jwt.MapClaims)
		if !ok {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		jwtUid, ok := claims["uid"].(float64)
		if !ok {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth401.Error(), nil, http.StatusUnauthorized)
			ctx.Abort()
			return
		}
		ctx.Set(constant.UserId, jwtUid)

		pathUid := ctx.Param("id")
		pathUidInt, err := strconv.Atoi(pathUid)
		if err != nil {
			util.ResponseJSON(ctx.Writer, apperror.ErrParamInvalidId400.Error(), nil, http.StatusBadRequest)
			ctx.Abort()
			return
		}

		if jwtUid != float64(pathUidInt) {
			util.ResponseJSON(ctx.Writer, apperror.ErrAuth403.Error(), nil, http.StatusForbidden)
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}
