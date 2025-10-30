package service

import (
	"fmt"
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/repository"
)

func GetClases() ([]models.DTOClase, error) {
	var clases []models.Clase
	var dtoClases []models.DTOClase
	var err error
	clases, err = repository.GetAllClases()

	if err != nil {
		return nil, fmt.Errorf("no se pudieron obtener las clases")
	}

	cantClases := len(clases)
	i := 0
	for i < cantClases{
		clase := clases[i]

		// 🚀 Traer todas las provincias una sola vez
		provincias, err := repository.GetAllProvincias()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener las provincias: %w", err)
		}
		provinciaMap := make(map[uint]string)
		for _, p := range provincias {
			provinciaMap[p.ID] = p.Nombre
		}

		// 🚀 Traer todos los profesores una sola vez
		profesores, err := repository.GetAllProfesores()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener los profesores: %w", err)
		}
		profesorMap := make(map[uint]string)
		for _, pr := range profesores {
			profesorMap[pr.ID] = pr.Nombre
		}

		fmt.Printf("Clase %s -> ProvinciaID: %d, ProfesorID: %d\n", clase.Nombre, clase.ProvinciaID, clase.ProfesorID)


		var materiasClase []string 
		j := 0
		for j < len(clase.Materias){
			materiasClase = append(materiasClase, clase.Materias[j].Nombre)
			j++
		}

		nuevaClase := models.DTOClase{
			ID: clase.ID,
			Nombre : clase.Nombre,
			Descripcion: clase.Descripcion,
			Precio: clase.Precio,
			Provincia: provinciaMap[clase.ProvinciaID],
			Profesor: profesorMap[clase.ProfesorID],
			Duracion: string(clase.Duracion),
			Modalidad: string(clase.Modalidad),
			Nivel: string(clase.Nivel),
			Materias: materiasClase,
		}
		dtoClases = append(dtoClases, nuevaClase)
		i++
	}

	return dtoClases,nil
}

func GetClasePorId (id string) (models.Clase,error) {
	return repository.GetClasePorId(id)
}


