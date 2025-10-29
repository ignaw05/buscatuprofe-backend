package main

import (
	"github.com/gin-gonic/gin"
	// "github.com/supabase-community/supabase-go"
	"buscatuprofe/cmd/web/routes"
	"buscatuprofe/internal/db"
)
func init() {

}

func main() {
    r := gin.Default()
    db.Init()
    routes.ClasesRoutes(r)
	r.Run("localhost:8080")
}
