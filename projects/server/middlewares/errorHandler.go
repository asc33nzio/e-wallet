package middleware

import (
	"net/http"

	"e-wallet/apperrors"
	"e-wallet/dtos"

	"github.com/gin-gonic/gin"
)

func GlobalErrorHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Next()

		err := ctx.Errors.Last()
		if err != nil {
			switch e := err.Err.(type) {
			case *apperror.AppError:
				ctx.AbortWithStatusJSON(e.Code, dto.Response{
					Message: e.Message,
					Data:    nil,
				})
			default:
				ctx.AbortWithStatusJSON(http.StatusInternalServerError, dto.Response{
					Message: err.Error(),
					Data:    nil,
				})
			}
		}
	}
}
