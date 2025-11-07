package controllers

import (
	"net/http"

	"buscatuprofe/internal/models"
	service "buscatuprofe/internal/services"

	"github.com/gin-gonic/gin"
)

func GetAllClases(c *gin.Context) {
	clases, err := service.GetAllClases()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, clases)
}

func GetClasePorId(c *gin.Context) {
	id := c.Param("id")
	clase, err := service.GetClasePorId(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo clase"})
		return
	}
	c.JSON(http.StatusOK, clase)
}

func AddClase(c *gin.Context) {
	var newClase models.DTOAddClase
	if err := c.BindJSON(&newClase); err != nil {
		return
	}

	// Validacion caracteres en nombre
	if len([]rune(newClase.Nombre)) < 3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "El nombre debe tener al menos 3 caracteres"})
		return 
	}

	// Validacion campos faltantes
	if newClase.ProvinciaID == 0 || newClase.ProfesorID == 0 || newClase.Descripcion == "" ||
	newClase.Duracion == "" || len(newClase.Materias) == 0 || newClase.Nivel == "" || newClase.Precio == 0 || 
	newClase.Modalidad == "" || newClase.Nombre == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ingrese todos los campos"})
		return
	}

	if err := service.AddClase(newClase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no se pudo guardar la clase"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "clase guardada correctamente"})
}

func GetClasesPorProfesorID(c *gin.Context) {
	id := c.Param("id")
	clases, err := service.GetClasesPorProfesorID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, clases)
}

func GetMaterias(c *gin.Context){
	materias,err := service.GetMaterias()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, materias)
}