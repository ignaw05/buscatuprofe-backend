package models

type DTOAllClase struct {
	ID          uint     `json:"id"`
	Nombre      string   `json:"nombre"`
	Profesor    string   `json:"profesor"`
	Descripcion string   `json:"descripcion"`
	Provincia   string   `json:"provincia"`
	Precio      float64  `json:"precio"`
	Duracion    string   `json:"duracion"`
	Modalidad   string   `json:"modalidad"`
	Nivel       string   `json:"nivel"`
	Materias    []string `json:"materias"`
}

type DTOClaseID struct {
	ID          uint        `json:"id"`
	Nombre      string      `json:"nombre"`
	Profesor    DTOProfesor `json:"profesor"`
	Descripcion string      `json:"descripcion"`
	Provincia   string      `json:"provincia"`
	Precio      float64     `json:"precio"`
	Duracion    string      `json:"duracion"`
	Modalidad   string      `json:"modalidad"`
	Nivel       string      `json:"nivel"`
	Materias    []string    `json:"materias"`
}

type DTOAddClase struct {
	// ID          uint    `json:"id"`
	Nombre      string   `json:"nombre"`
	ProfesorID  uint     `json:"profesor_id"`
	Descripcion string   `json:"descripcion"`
	ProvinciaID uint     `json:"provincia_id"`
	Precio      float64  `json:"precio"`
	Duracion    string   `json:"duracion"`
	Modalidad   string   `json:"modalidad"`
	Nivel       string   `json:"nivel"`
	Materias    []string `json:"materias"`
}

type DTOProfesor struct {
	ID             uint     `json:"id"`
	Nombre         string   `json:"nombre"`
	Mail           string   `json:"mail"`
	Telefono       string   `json:"telefono"`
	Titulos        []string `json:"titulos"`
	Disponibilidad []string `json:"disponibilidad"`
}


type DTOClasesProfesor struct {
	ID          uint        `json:"id"`
	Nombre      string      `json:"nombre"`
	Descripcion string      `json:"descripcion"`
	Provincia   string      `json:"provincia"`
	Precio      float64     `json:"precio"`
	Duracion    string      `json:"duracion"`
	Modalidad   string      `json:"modalidad"`
	Nivel       string      `json:"nivel"`
	Materias    []string    `json:"materias"`
}

type DTOMateria struct {
	Materias []string `json:"materias"`
}