package models

// ErrorResponse representa un mensaje de error genérico.
// swagger:model
type ErrorResponse struct {
    Error string `json:"error" example:"no se pudieron obtener las clases"`
}
