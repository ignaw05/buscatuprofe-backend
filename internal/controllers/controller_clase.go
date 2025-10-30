package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
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

func GetClasePorId(c *gin.Context) {
	id := c.Param("id")
	clase, err := service.GetClasePorId(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Error obteniendo clase"})
		return
	}
	c.JSON(http.StatusOK,clase)
}
