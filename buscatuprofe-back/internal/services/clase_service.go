package service

import (
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/repository"
	"buscatuprofe/internal/errors"
	"fmt"
	"strconv"
)

func GetAllClases() ([]models.DTOAllClase, error) {
	var clases []models.Clase
	var dtoClases []models.DTOAllClase
	var err error
	clases, err = repository.GetAllClases()

	if err != nil {
		return nil, fmt.Errorf("no se pudieron obtener las clases: %w", errors.ErrDatabaseError)
	}

	cantClases := len(clases)
	i := 0
	for i < cantClases {
		clase := clases[i]

		provincias, err := repository.GetAll[models.Provincia]()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener las provincias: %w", errors.ErrDatabaseError)
		}
		provinciaMap := make(map[uint]string)
		for _, p := range provincias {
			provinciaMap[p.ID] = p.Nombre
		}

		profesores, err := repository.GetAll[models.Profesor]()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener los profesores: %w", errors.ErrDatabaseError)
		}
		profesorMap := make(map[uint]string)
		for _, pr := range profesores {
			profesorMap[pr.ID] = pr.Nombre
		}

		var materiasClase []string
		j := 0
		for j < len(clase.Materias) {
			materiasClase = append(materiasClase, clase.Materias[j].Nombre)
			j++
		}

		nuevaClase := models.DTOAllClase{
			ID:          clase.ID,
			Nombre:      clase.Nombre,
			Descripcion: clase.Descripcion,
			Precio:      clase.Precio,
			Provincia:   provinciaMap[clase.ProvinciaID],
			Profesor:    profesorMap[clase.ProfesorID],
			Duracion:    string(clase.Duracion),
			Modalidad:   string(clase.Modalidad),
			Nivel:       string(clase.Nivel),
			Materias:    materiasClase,
		}
		dtoClases = append(dtoClases, nuevaClase)
		i++
	}

	return dtoClases, nil
}

func GetClasePorId(id string) (models.DTOClaseID, error) {
	var clase models.Clase
	var err error
	clase, err = repository.GetClasePorId(id)

	if err != nil {
		return models.DTOClaseID{}, errors.ErrDatabaseError
	}

	provincia, err := repository.GetByID[models.Provincia](clase.ProvinciaID)
	if err != nil {
		return models.DTOClaseID{}, errors.ErrDatabaseError
	}

	profesor, err := GetInfoProfesor(strconv.Itoa(int(clase.ProfesorID)))
	if err != nil {
		return models.DTOClaseID{}, errors.ErrDatabaseError
	}

	var materiasClase []string
	j := 0
	for j < len(clase.Materias) {
		materiasClase = append(materiasClase, clase.Materias[j].Nombre)
		j++
	}

	claseBuscada := models.DTOClaseID{
		ID:          clase.ID,
		Nombre:      clase.Nombre,
		Descripcion: clase.Descripcion,
		Precio:      clase.Precio,
		Profesor:    profesor,
		Provincia:   provincia.Nombre,
		Duracion:    string(clase.Duracion),
		Modalidad:   string(clase.Modalidad),
		Nivel:       string(clase.Nivel),
		Materias:    materiasClase,
	}

	return claseBuscada, err
}

func AddClase(clase models.DTOAddClase) error {
	var materias []models.Materia

	for _, m := range clase.Materias {
		materia, err := repository.GetOrCreateMateriaByNombre(m)
		if err != nil {
			return errors.ErrDatabaseError
		}
		materias = append(materias, materia)
	}

	newClase := models.Clase{
		// ID:          clase.ID,
		Descripcion: clase.Descripcion,
		Precio:      clase.Precio,
		Duracion:    models.Duracion(clase.Duracion),
		Modalidad:   models.Modalidad(clase.Modalidad),
		Nivel:       models.Nivel(clase.Nivel),
		Materias:    materias,
		ProvinciaID: clase.ProvinciaID,
		ProfesorID:  clase.ProfesorID,
	}
	err := repository.Add[models.Clase](&newClase)
	return err
}

func GetClasesPorProfesorID(id any) ([]models.DTOClasesProfesor, error) {
	var clases []models.Clase
	var dtoClases []models.DTOClasesProfesor
	var err error
	clases, err = repository.GetClasesPorProfesorID(id)

	if err != nil {
		return nil, fmt.Errorf("no se pudieron obtener las clases: %w", errors.ErrDatabaseError)
	}

	cantClases := len(clases)
	i := 0
	for i < cantClases {
		clase := clases[i]

		provincias, err := repository.GetAll[models.Provincia]()
		if err != nil {
			return nil, fmt.Errorf("no se pudieron obtener las provincias: %w", errors.ErrDatabaseError)
		}
		provinciaMap := make(map[uint]string)
		for _, p := range provincias {
			provinciaMap[p.ID] = p.Nombre
		}

		var materiasClase []string
		j := 0
		for j < len(clase.Materias) {
			materiasClase = append(materiasClase, clase.Materias[j].Nombre)
			j++
			fmt.Println(materiasClase)
		}

		nuevaClase := models.DTOClasesProfesor{
			ID:          clase.ID,
			Nombre:      clase.Nombre,
			Descripcion: clase.Descripcion,
			Precio:      clase.Precio,
			Provincia:   provinciaMap[clase.ProvinciaID],
			Duracion:    string(clase.Duracion),
			Modalidad:   string(clase.Modalidad),
			Nivel:       string(clase.Nivel),
			Materias:    materiasClase,
		}
		dtoClases = append(dtoClases, nuevaClase)
		i++
	}

	return dtoClases, nil
}

func GetMaterias() (models.DTOMateria, error) {
	materias, err := repository.GetAll[models.Materia]()
	if err != nil {
		return models.DTOMateria{}, fmt.Errorf("no se pudieron obtener las materias: %w", errors.ErrDatabaseError)
	}

	// Eliminar duplicados usando un map
	materiasMap := make(map[string]bool)
	var materiaList []string

	for _, materia := range materias {
		// Si la materia no existe en el map, la agregamos
		if !materiasMap[materia.Nombre] {
			materiasMap[materia.Nombre] = true
			materiaList = append(materiaList, materia.Nombre)
		}
	}

	dtomateria := models.DTOMateria{
		Materias: materiaList,
	}
	return dtomateria, nil
}


// FALTA PUT DE CLASES
// FALTA QUE SE AGREGUEN LAS MATERIAS A LA DB CUANDO SE ACTUALICE
// FALTA VERIFICACION ANTES DE CREAR LAS MATERIAS EN LA DB 