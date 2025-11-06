package routes

import (
	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/controllers"
)

func ProfesorRoutes(r *gin.Engine) {
	profesor := r.Group("/profesor")
	{
		profesor.GET("/perfil/id=:id", controllers.GetInfoProfesor)
		profesor.GET("/clases/id=:id",controllers.GetClasesPorProfesorID)

	}
}