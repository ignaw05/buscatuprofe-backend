package controllers

import (
	"net/http"

	"buscatuprofe/internal/services"

	"github.com/gin-gonic/gin"
)

func GetInfoProfesor(c *gin.Context){
	id := c.Param("id")
	infoProfe, err := service.GetInfoProfesor(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo profesor"})
		return
	}
	c.JSON(http.StatusOK,infoProfe)
}