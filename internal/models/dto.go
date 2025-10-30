package models

type DTOClase struct{
	Nombre      string       `json:"nombre"`
	Profesor    string       `json:"profesor"`
	Descripcion string       `json:"descripcion"`
	Provincia string         `json:"provincia"`
	Precio      float64      `json:"precio"`

	Duracion   string  `json:"duracion"`
	Modalidad  string `json:"modalidad"`
	Nivel      string     `json:"nivel"`
	Materias []string `json:"materias"`
}