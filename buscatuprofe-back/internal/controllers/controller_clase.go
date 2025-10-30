package controllers

import (
	"net/http"

	"buscatuprofe/internal/models"
	"buscatuprofe/internal/services"

	"github.com/gin-gonic/gin"
)

func GetClases(c *gin.Context) {
	clases, err := service.GetClases()
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
		c.JSON(http.StatusInternalServerError, gin.H{"error":"error obteniendo clase"})
		return
	}
	c.JSON(http.StatusOK,clase)
}

func AddClase(c *gin.Context) {
	var newClase models.DTOClasePost
	if err := c.BindJSON(&newClase); err != nil {
		return
	}

	if err := service.AddClase(newClase); err != nil {
		c.JSON(http.StatusOK, gin.H{"error":"no se pudo guardar la clase"})
		return
	}

	c.JSON(http.StatusOK,gin.H{"success":"clase guardada correctamente"})
}
