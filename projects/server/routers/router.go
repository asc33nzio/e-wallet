package router

import (
	"database/sql"

	"e-wallet/controllers"
	"e-wallet/middlewares"
	"e-wallet/repositories"
	"e-wallet/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	router.Use(cors.New(config))

	router.Use(middleware.GlobalErrorHandler())
	router.Use(middleware.RequestLogger)
	router.Use(middleware.ErrorLogger)
	router.ContextWithFallback = true

	userRepository := repository.NewUserRepositoryPostgres(db)
	userService := service.NewUserServiceImpl(userRepository)
	userController := controller.NewUserController(userService)
	router.POST("/auth/register", userController.RegisterUser)
	router.POST("/auth/login", userController.Login)
	router.POST("/auth/forget", userController.ForgetPassword)
	router.POST("/auth/reset/:token", userController.ResetPassword)
	router.GET("/users/:id", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), userController.GetOneUser)
	router.PATCH("/users/:id", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), userController.UpdateProfile)
	router.GET("/avatars/users/:id", userController.GetAvatar)

	walletRepository := repository.NewWalletRepositoryPostgres(db)
	walletService := service.NewWalletServiceImpl(walletRepository)
	walletController := controller.NewWalletController(walletService)
	router.POST("/wallet/:id/topup", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), walletController.TopUpWallet)
	router.POST("/wallet/:id/transfer", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), walletController.Transfer)
	router.GET("/wallet/:id/transactions", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), walletController.TransactionHistory)

	gachaRepository := repository.NewGachaRepositoryPostgres(db)
	gachaService := service.NewGachaServiceImpl(gachaRepository)
	gachaController := controller.NewGachaController(gachaService)
	router.GET("/rewards/hidden-route", gachaController.GetAllBoxes)
	router.POST("/rewards/:id", middleware.ValidateJWT(), middleware.ValidateCorrectUserParamEdp(), gachaController.ClaimReward)

	return router
}
