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

func GetAllProvincias() ([]models.Provincia, error) {
	var provincia []models.Provincia
	result := db.DB.Find(&provincia)
	return provincia,result.Error
}

func GetAllProfesores() ([]models.Profesor, error) {
	var profesor []models.Profesor
	result := db.DB.Find(&profesor)
	return profesor,result.Error
}

func GetMateriaById(id uint) (models.Materia, error) {
	var materia models.Materia
	result := db.DB.Find(&materia, "id = ?",id)
	return materia,result.Error
}

func GetProvinciaById(id uint) (models.Provincia, error) {
	var prov models.Provincia
	result := db.DB.Find(&prov, "id = ?",id)
	return prov,result.Error
}

func GetMateriaByNombre(nombre string) (models.Materia, error) {
	var materia models.Materia
	result := db.DB.FirstOrCreate(&materia, models.Materia{Nombre: nombre})
	return materia,result.Error
}


func AddClase(clase models.Clase) error {
	result := db.DB.Create(&clase)
	return result.Error
}
