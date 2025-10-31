package models

import "fmt"

// ---------------- ENUMS ----------------

type Duracion string
const (
	Duracion30  Duracion = "30 minutos"
	Duracion45  Duracion = "45 minutos"
	Duracion60  Duracion = "1 hora"
	Duracion75  Duracion = "1 hora 15 minutos"
	Duracion90  Duracion = "1 hora 30 minutos"
	Duracion105 Duracion = "1 hora 45 minutos"
	Duracion120 Duracion = "2 horas"
	Duracion135 Duracion = "2 horas 15 minutos"
	Duracion150 Duracion = "2 horas 30 minutos"
	Duracion165 Duracion = "2 horas 45 minutos"
	Duracion180 Duracion = "3 horas"
)

type Modalidad string
const (
	Virtual     Modalidad = "Virtual"
	Presencial  Modalidad = "Presencial"
	Mixta       Modalidad = "Presencial y Virtual"
)

type Nivel string
const (
	Primaria         Nivel = "Primaria"
	Secundaria       Nivel = "Secundaria"
	PreUniversitario Nivel = "Preuniversitario"
	Universitario    Nivel = "Universitario"
	IdiomaInicial    Nivel = "Idioma Inicial"
	IdiomaAvanzado   Nivel = "Idioma Avanzado"
	ExtraCurricular  Nivel = "Extracurricular"
)


// ---------------- MODELOS ----------------

type Clase struct {
	ID          uint         `json:"id" gorm:"primaryKey"`
	Nombre      string       `json:"nombre"`
	Descripcion string       `json:"descripcion"`
	ProvinciaID uint         `json:"provincia_id"`
	Precio      float64      `json:"precio"`

	Duracion   Duracion  `json:"duracion" gorm:"type:varchar(20)"`
	Modalidad  Modalidad `json:"modalidad" gorm:"type:varchar(30)"`
	Nivel      Nivel     `json:"nivel" gorm:"type:varchar(30)"`

	ProfesorID uint         `json:"profesor_id"`
	Materias   []Materia    `json:"materias" gorm:"many2many:clase_materias;"`
}

type Materia struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	Nombre  string `json:"nombre"`
}
