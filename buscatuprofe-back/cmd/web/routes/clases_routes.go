package routes

import (
	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/controllers"
)

func ClasesRoutes(r *gin.Engine) {
	clases := r.Group("/clases")
	{
		clases.GET("", controllers.GetClases)        // GET /clases
		clases.GET("/id=:id", controllers.GetClasePorId) 	// GET clases/id
		clases.POST("/nueva", controllers.AddClase)
	}
}