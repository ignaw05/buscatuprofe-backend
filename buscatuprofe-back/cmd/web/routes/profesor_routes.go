package routes

import (
	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/controllers"
)

func ProfesorRoutes(r *gin.Engine) {
	clases := r.Group("/profesor")
	{
		clases.GET("/perfil/id=:id", controllers.GetInfoProfesor) 	// GET clases/id
	}
}