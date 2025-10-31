package service

import (
	"fmt"
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/repository"
	"strconv"
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

		provincias, err := repository.GetAll[models.Provincia]()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener las provincias: %w", err)
		}
		provinciaMap := make(map[uint]string)
		for _, p := range provincias {
			provinciaMap[p.ID] = p.Nombre
		}

		profesores, err := repository.GetAll[models.Profesor]()
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

func GetClasePorId (id string) (models.DTOClase,error) {
	var clase models.Clase
	var err error
	clase, err = repository.GetClasePorId(id)

	if err != nil {
		return models.DTOClase{}, fmt.Errorf("no se pudo obtener la clase")
	}

	provincia,err := repository.GetByID[models.Provincia](clase.ProvinciaID)
	if err != nil {
		return models.DTOClase{},fmt.Errorf("no se pudo obtener la provincia")
	}

	profesor, err := repository.GetCompleteProfesorById(strconv.Itoa(int(clase.ProfesorID)))
	if err != nil {
		return models.DTOClase{},fmt.Errorf("no se pude obtener el profesor")
	}

	var materiasClase []string 
	j := 0
	for j < len(clase.Materias){
		materiasClase = append(materiasClase, clase.Materias[j].Nombre)
		j++
	}

	claseBuscada := models.DTOClase{
		ID: clase.ID,
		Nombre : clase.Nombre,
		Descripcion: clase.Descripcion,
		Precio: clase.Precio,
		Profesor: profesor.Nombre,
		Provincia: provincia.Nombre,
		Duracion: string(clase.Duracion),
		Modalidad: string(clase.Modalidad),
		Nivel: string(clase.Nivel),
		Materias: materiasClase,
	}

	return claseBuscada, err
}
// Modificar para retornar DTO

func AddClase(clase models.DTOClasePost) (error) {
	var materias []models.Materia

	for _, m := range clase.Materias {
		materia,err := repository.GetOrCreateMateriaByNombre(m)
		if err != nil{
			return fmt.Errorf("no se puedo encontrar o crear la materia")
		}
    	materias = append(materias, materia)
	}

	newClase := models.Clase{
		ID: clase.ID,
		Descripcion: clase.Descripcion,
		Precio: clase.Precio,
		Duracion: models.Duracion(clase.Duracion),
		Modalidad: models.Modalidad(clase.Modalidad),
		Nivel: models.Nivel(clase.Nivel),
		Materias: materias,
		ProvinciaID: clase.ProvinciaID,
		ProfesorID: clase.ProfesorID,
	}
	err := repository.Add[models.Clase](&newClase)
	return err
}


