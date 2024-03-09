package util

import (
	"os"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pwd string) ([]byte, error) {
	salt, err := strconv.Atoi(os.Getenv("SALT"))
	if err != nil {
		return nil, err
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), salt)
	if err != nil {
		return nil, err
	}
	return hash, nil
}

func CheckPassword(pwd string, hash []byte) (bool, error) {
	err := bcrypt.CompareHashAndPassword(hash, []byte(pwd))
	if err != nil {
		return false, err
	}
	return true, nil
}
