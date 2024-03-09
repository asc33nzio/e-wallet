package main

import (
	"os"
	"runtime/debug"

	"e-wallet/apperrors"
	"e-wallet/databases"
	"e-wallet/logger"
	"e-wallet/routers"
)

func main() {
	err := ConfigInit()
	if err != nil {
		logger.Error(apperror.NewAppError(500, "error loading .env file: ", debug.Stack()).Error())
	}

	logger.Init()

	db, err := database.ConnectDB()
	if err != nil {
		logger.Error(apperror.NewAppError(500, "error connecting to db: ", debug.Stack()).Error())
	}
	defer db.Close()

	router := router.SetupRouter(db)

	Addr := os.Getenv("PORT")
	if err := router.Run(Addr); err != nil {
		logger.Error(apperror.NewAppError(500, "error trying to start gin server: ", debug.Stack()).Error())
	}
}
