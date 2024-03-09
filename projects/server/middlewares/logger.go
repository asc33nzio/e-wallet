package middleware

import (
	"e-wallet/logger"
	"fmt"

	"github.com/gin-gonic/gin"
)

func RequestLogger(c *gin.Context) {
	logger.Info(fmt.Sprintf("Request: %s %s", c.Request.Method, c.Request.URL.Path))

	c.Next()
}

func ErrorLogger(c *gin.Context) {
	if c.Errors != nil {
		logger.Error(fmt.Sprintf("Error: %v", c.Errors))
	}

	c.Next()
}
