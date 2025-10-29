package repository

import (
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/db"
)

func GetAllClases() ([]models.Clase, error) {
	var clases []models.Clase
	result := db.DB.Find(&clases)
	return clases, result.Error
}

func CreateClase(clase models.Clase) error {
	result := db.DB.Create(&clase)
	return result.Error
}
