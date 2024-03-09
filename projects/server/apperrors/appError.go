package apperror

import (
	"fmt"
	"net/http"
)

type AppError struct {
	Code    int
	Message string
	Stack   []byte
}

func (e *AppError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

func NewAppError(code int, message string, stack []byte) *AppError {
	return &AppError{
		Code:    code,
		Message: message,
		Stack:   stack,
	}
}

func BadRequest(message string) *AppError {
	return &AppError{
		Code:    http.StatusBadRequest,
		Message: message,
	}
}

func Unauthorized(message string) *AppError {
	return &AppError{
		Code:    http.StatusUnauthorized,
		Message: message,
	}
}

func Forbidden(message string) *AppError {
	return &AppError{
		Code:    http.StatusForbidden,
		Message: message,
	}
}

func NotFound(message string) *AppError {
	return &AppError{
		Code:    http.StatusNotFound,
		Message: message,
	}
}

func InternalServerError() *AppError {
	return &AppError{
		Code:    http.StatusInternalServerError,
		Message: ErrInternal500.Error(),
	}
}
