package errors

import "errors"

var (
	ErrNotFound      = errors.New("no encontrado")
	ErrInvalidInput  = errors.New("entrada inválida")
	ErrDatabaseError = errors.New("error en la base de datos")
)
