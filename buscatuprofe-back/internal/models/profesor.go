package models

import "time"

type Profesor struct {
	ID             uint                   `json:"id" gorm:"primaryKey"`
	Nombre         string                 `json:"nombre"`
	Mail           string                 `json:"mail"`
	Telefono       string                 `json:"telefono"`
	Titulos        []Titulo               `json:"titulos" gorm:"many2many:profesor_titulos;"`
	Disponibilidad []ProfesorDisponibilidad `json:"disponibilidad" gorm:"foreignKey:ProfesorID"`
}

type Titulo struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	Nombre string `json:"nombre"`
}

type ProfesorDisponibilidad struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	ProfesorID  uint      `json:"profesor_id"`
	DiaID       uint      `json:"dia_id"`
	HoraDesde   time.Time `json:"hora_desde"`
	HoraHasta   time.Time `json:"hora_hasta"`
	Dia         Dia       `json:"dia"`
}

type Dia struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	Nombre  string `json:"nombre"`
}
