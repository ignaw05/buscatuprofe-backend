package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/services"
)

func GetClases(c *gin.Context) {
	clases, err := service.GetClases()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, clases)
}

func CreateClase(c *gin.Context) {
	var clase models.Clase
	if err := c.ShouldBindJSON(&clase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido"})
		return
	}

	if err := service.AddClase(clase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Clase creada con éxito"})
}
