package routes

import (
	"buscatuprofe/internal/controllers"

	"github.com/gin-gonic/gin"
)

func ParamRoutes(r *gin.Engine) {
		r.GET("/materias", controllers.GetMaterias)         // GET /clases
}
