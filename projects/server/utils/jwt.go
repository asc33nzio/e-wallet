package util

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func CreateAndSign(userId int32) (string, error) {
	key := os.Getenv("JWT_KEY")
	issuer := os.Getenv("JWT_ISSUER")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": issuer,
		"iat": time.Now(),
		"exp": time.Now().Add(3 * time.Hour).Unix(),
		"uid": userId,
	})

	signed, err := token.SignedString([]byte(key))
	if err != nil {
		return "", err
	}

	return signed, nil
}

func ParseAndVerify(signed string) (jwt.MapClaims, error) {
	key := os.Getenv("JWT_KEY")
	issuer := os.Getenv("JWT_ISSUER")
	token, err := jwt.Parse(signed, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	}, jwt.WithIssuer(issuer),
		jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Name}),
		jwt.WithExpirationRequired(),
	)
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return claims, nil
	} else {
		return nil, fmt.Errorf("unknown claims")
	}
}