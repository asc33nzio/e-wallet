package validator

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

type Validator struct {
	Validate *validator.Validate
}

func NewValidatorImpl() *Validator {
	v := validator.New()
	v.RegisterValidation("validatePassword", ValidatePassword)
	v.RegisterValidation("validateString", ValidateString)

	return &Validator{
		Validate: v,
	}
}

func ValidatePassword(fl validator.FieldLevel) bool {
	password := fl.Field().String()

	if len(password) < 6 {
		return false
	}

	hasUpper := false
	hasLower := false
	hasDigit := false
	hasSpecial := false

	for _, char := range password {
		switch {
		case 'A' <= char && char <= 'Z':
			hasUpper = true
		case 'a' <= char && char <= 'z':
			hasLower = true
		case '0' <= char && char <= '9':
			hasDigit = true
		case strings.Contains("!@#$%^&*()-_=+[]{}|;:'\",.<>/?", string(char)):
			hasSpecial = true
		}
	}

	return hasUpper && hasLower && hasDigit && hasSpecial
}

func ValidateString(fl validator.FieldLevel) bool {
	value := fl.Field().String()
	return len(value) > 0
}
