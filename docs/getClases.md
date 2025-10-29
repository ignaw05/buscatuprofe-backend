Funcionamiento de GetClases()

## MODEL
```
type Clase struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Nombre      string `json:"nombre"`
	Profesor    string `json:"profesor"`
	Descripcion string `json:"descripcion"`
}
```

## MAIN
```
r.GET("/getclases", controllers.GetClases)
```

## CONTROLLER
### Recibe la solicitud y la deriva al Service
```
func GetClases(c *gin.Context) {
	clases, err := service.GetClases()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo clases"})
		return
	}
	c.JSON(http.StatusOK, clases)
}
```

*gin.Context es un puntero al contexto de una solicitud HTTP

## SERVICE
### Es el encargado de la logica de negocio. Lo llama el Controller y le pide al Repository que vaya a la DB
```
func GetClases() ([]models.Clase, error) {
	return repository.GetAllClases()
}
```

## REPOSITORY
### Se encarga de comunicarse con la DB.
```
func GetAllClases() ([]models.Clase, error) {
	var clases []models.Clase
	result := db.DB.Find(&clases)
	return clases, result.Error
}
```






