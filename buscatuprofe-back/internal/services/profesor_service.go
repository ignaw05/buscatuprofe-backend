package service

import (
	"fmt"
	"buscatuprofe/internal/models"
	"buscatuprofe/internal/repository"
)

func GetInfoProfesor(id string) (models.DTOProfesor, error) {
	profesor, err := repository.GetProfesorById(id)

	if err != nil {
		return models.DTOProfesor{}, fmt.Errorf("no se pudo obtener el profesor")
	}

	var titulos []string
	for _, t := range profesor.Titulos {
    titulos = append(titulos, t.Nombre)
	}

	var disponibilidad []string
	for _, d := range profesor.Disponibilidad {
		disponibilidad = append(
			disponibilidad,
			fmt.Sprintf("%s: %s - %s",
				d.Dia.Nombre,
				d.HoraDesde.Format("15:04"),
				d.HoraHasta.Format("15:04"),
			),
		)
	}
	dtoProfesor := models.DTOProfesor {
		ID: profesor.ID,
		Nombre: profesor.Nombre,
		Mail: profesor.Mail,
		Telefono: profesor.Telefono,
		Titulos: titulos,
		Disponibilidad: disponibilidad,
	}
	return dtoProfesor, err
}