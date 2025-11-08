package routes

import (
	"buscatuprofe/internal/controllers"

	"github.com/gin-gonic/gin"
)

func ClasesRoutes(r *gin.Engine) {
	clases := r.Group("/clases")
	{
		clases.GET("", controllers.GetAllClases)         // GET /clases
		clases.GET("/:id", controllers.GetClasePorId) // GET clases/id
		clases.POST("/nueva", controllers.AddClase)
	}
}
