package repository

import (
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/db"
)

func GetAllClases() ([]models.Clase, error) {
	var clases []models.Clase
	result := db.DB.
	Preload("Materias").
	Find(&clases)

	return clases, result.Error
}

func GetClasePorId(id string) (models.Clase,error) {
	var clase models.Clase
	result := db.DB.
	Preload("Materias").
	First(&clase, "id = ?",id)
	return clase, result.Error
}


func GetByID[T any](id any) (T, error) {
	var entity T
	result := db.DB.First(&entity, id)
	return entity, result.Error
}

func GetAll[T any]() ([]T, error) {
	var entities []T
	result := db.DB.Find(&entities)
	return entities, result.Error
}


func GetOrCreateMateriaByNombre(nombre string) (models.Materia, error) {
	var materia models.Materia
	result := db.DB.FirstOrCreate(&materia, models.Materia{Nombre: nombre})
	return materia,result.Error
}

func Add[T any](entity *T) error {
	return db.DB.Create(entity).Error
}
