package service

import (
	"fmt"
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/repository"
)

func GetClases() ([]models.Clase, error) {
	return repository.GetAllClases()
}

func AddClase(clase models.Clase) error {
	// Podrías validar datos acá, por ejemplo:
	if clase.Nombre == "" || clase.Profesor == "" {
		return fmt.Errorf("nombre y profesor son obligatorios")
	}
	return repository.CreateClase(clase)
}
