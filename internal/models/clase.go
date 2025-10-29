package models

type Clase struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Nombre      string `json:"nombre"`
	Profesor    string `json:"profesor"`
	Descripcion string `json:"descripcion"`
}
