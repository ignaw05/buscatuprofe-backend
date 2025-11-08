package main

import (
	"github.com/gin-gonic/gin"
	// "github.com/supabase-community/supabase-go"
	"buscatuprofe/cmd/web/routes"
	"buscatuprofe/internal/db"
	"github.com/gin-contrib/cors"
	"github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    _ "buscatuprofe/docs" // 👈 importante: importá los docs generados
	"time"
)
func init() {

}

func main() {
    r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))
    db.Init()
    routes.ClasesRoutes(r)
	routes.ParamRoutes(r)
	routes.ProfesorRoutes(r)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run("localhost:8080")
}
