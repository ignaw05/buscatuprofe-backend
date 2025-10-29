package main

import (
	"github.com/gin-gonic/gin"
	// "github.com/supabase-community/supabase-go"
    "buscatuprofe/internal/controllers"
    "buscatuprofe/internal/db"
)
func init() {

}

func main() {
    r := gin.Default()
    db.Init()
    r.GET("/getclases", controllers.GetClases)
	r.POST("/clases", controllers.CreateClase)
	r.Run("localhost:8080")

}
