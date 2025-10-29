package routes

import (
	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/controllers"
)

func ClasesRoutes(r *gin.Engine) {
	clases := r.Group("/clases")
	{
		clases.GET("", controllers.GetClases)        // GET /clases
		clases.POST("/nueva", controllers.CreateClase) // POST /clases/nueva
	}
}