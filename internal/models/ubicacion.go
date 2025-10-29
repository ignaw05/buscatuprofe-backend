package models

type Provincia struct {
	ID         uint        `json:"id" gorm:"primaryKey"`
	Nombre     string      `json:"nombre"`
	Localidades []Localidad `json:"localidades" gorm:"foreignKey:ProvinciaID"`
}

type Localidad struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Nombre      string `json:"nombre"`
	ProvinciaID uint   `json:"provincia_id"` 
}
