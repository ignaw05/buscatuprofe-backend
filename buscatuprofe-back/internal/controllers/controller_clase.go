package controllers

import (
	"net/http"

	"buscatuprofe/internal/models"
	service "buscatuprofe/internal/services"

	"github.com/gin-gonic/gin"
	"buscatuprofe/internal/httphelper"
	"strconv"

)


// GetAllClases godoc
// @Summary Obtiene todas las clases
// @Description Retorna la informacion de cada clase
// @Tags Clases
// @Produce json
// @Success 200 {array} models.DTOAllClase
// @Failure 500 {object} models.ErrorResponse "No se pudieron obtener las clases"
// @Router /clases [get]
func GetAllClases(c *gin.Context) {
	clases, err := service.GetAllClases()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, clases)
}


// GetClasePorId godoc
// @Summary Obtiene una clase por id
// @Description Retorna la informacion de una clase especifica
// @Tags Clases
// @Param id path string true "ID de la clase"
// @Success 200 {object} models.DTOClaseID
// @Failure 400 {object} models.ErrorResponse "Entrada inválida"
// @Failure 404 {object} models.ErrorResponse "Clase no encontrada"
// @Failure 500 {object} models.ErrorResponse "Error interno"
// @Router /clases/{id} [get]
func GetClasePorId(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		httphelper.HandleError(c, http.ErrSchemeMismatch)
		return
	}
	clase, err := service.GetClasePorId(idStr)
		if err != nil {
			httphelper.HandleError(c, err)
			return
		}
	c.JSON(http.StatusOK, clase)
}



// AddClase godoc
// @Summary Crear una clase
// @Description Agrega una nueva clase
// @Tags Clases
// @Accept json
// @Produce json
// @Param clase body models.DTOAddClase true "Datos de la clase a crear"
// @Success 200 {object} map[string]string "Clase guardada correctamente"
// @Failure 400 {object} models.ErrorResponse "Datos invalidos o faltantes"
// @Failure 500 {object} models.ErrorResponse "Error interno al guardar la clase"
// @Router /clases [post]
func AddClase(c *gin.Context) {
	var newClase models.DTOAddClase
	if err := c.BindJSON(&newClase); err != nil {
		return
	}

	// Validacion caracteres en nombre
	if len([]rune(newClase.Nombre)) < 3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "El nombre debe tener al menos 3 caracteres"})
		return 
	}

	// Validacion campos faltantes
	if newClase.ProvinciaID == 0 || newClase.ProfesorID == 0 || newClase.Descripcion == "" ||
	newClase.Duracion == "" || len(newClase.Materias) == 0 || newClase.Nivel == "" || newClase.Precio == 0 || 
	newClase.Modalidad == "" || newClase.Nombre == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ingrese todos los campos"})
		return
	}

	if err := service.AddClase(newClase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no se pudo guardar la clase"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "clase guardada correctamente"})
}


// GetClasesPorProfesorID godoc
// @Summary Obtener las clases de un profesor
// @Description Obtiene los datos de las clases de un profesor
// @Tags Clases
// @Produce json
// @Param id path string true "ID del profesor"
// @Success 200 {array} models.DTOClasesProfesor
// @Failure 500 {object} models.ErrorResponse "No se pudieron obtener las clases"
// @Router /profesor/clases/{id} [get]
func GetClasesPorProfesorID(c *gin.Context) {
	id := c.Param("id")
	clases, err := service.GetClasesPorProfesorID(id)
	if err != nil {
		httphelper.HandleError(c, err)
		return
	}
	c.JSON(http.StatusOK, clases)
}

// GetMaterias godoc
// @Summary Lista todas las materias disponibles
// @Description Obtiene los datos de las materias disponibles
// @Tags Materias
// @Produce json
// @Success 200 {object} models.DTOMateria
// @Failure 500 {object} models.ErrorResponse "No se pudieron obtener las materias"
// @Router /materias [get]
func GetMaterias(c *gin.Context){
	materias,err := service.GetMaterias()
	if err != nil {
		httphelper.HandleError(c, err)
		return
	}
	c.JSON(http.StatusOK, materias)
}

// Hacer clase para manejar errores