package repository

import (
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/db"
)

func GetCompleteProfesorById(id string) (models.Profesor, error) {
	var profesor models.Profesor
	result := db.DB.
	Preload("Disponibilidad.Dia").
	Preload("Titulos").
	First(&profesor, "id = ?",id)

	return profesor, result.Error
}
