package httphelper

import (
	"net/http"
	"buscatuprofe/internal/models"
	customerrors "buscatuprofe/internal/errors"
	"github.com/gin-gonic/gin"
)

// HandleError traduce los errores del service a respuestas HTTP JSON consistentes.
func HandleError(c *gin.Context, err error) {
	switch {
	case err == customerrors.ErrNotFound:
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: err.Error()})
	case err == customerrors.ErrInvalidInput:
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
	case err == customerrors.ErrDatabaseError:
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
	default:
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
	}
}

