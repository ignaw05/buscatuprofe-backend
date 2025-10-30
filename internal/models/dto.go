package models

type DTOClase struct{
	ID uint `json:"id"`
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


type DTOProfesor struct {
		ID             uint                   `json:"id" gorm:"primaryKey"`
	Nombre         string                 `json:"nombre"`
	Mail           string                 `json:"mail"`
	Telefono       string                 `json:"telefono"`
	Titulos        []Titulo               `json:"titulos" gorm:"many2many:profesor_titulos;"`
	Disponibilidad []ProfesorDisponibilidad `json:"disponibilidad" gorm:"foreignKey:ProfesorID"`
}