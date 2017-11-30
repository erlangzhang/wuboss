package common

import (
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var (
	key []byte = []byte("-jwt-wushu@wukc.com")
)

func GenToken() (string, int64) {
	expireTime := time.Now().Add(time.Hour * 1).Unix()

	claims := &jwt.StandardClaims{
		NotBefore: int64(time.Now().Unix()),
		ExpiresAt: expireTime,
		Issuer:    "wushu",
	}

	// Create the token using your claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Signs the token with a secret.
	tokenString, _ := token.SignedString(key)

	return tokenString, expireTime
}

func CheckToken(token string) bool {
	_, err := jwt.Parse(token, func(*jwt.Token) (interface{}, error) {
		return key, nil
	})
	if err != nil {
		fmt.Println("check token failed.", err)
		return false
	}
	return true
}
