package main

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"buscatuprofe/internal/models"
)

func main() {
	db, err := gorm.Open(sqlite.Open("buscatuprofe.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Error al conectar con la base de datos:", err)
	}

	// 🔹 Migrar esquema
	err = db.AutoMigrate(
		&models.Profesor{},
		&models.Titulo{},
		&models.ProfesorDisponibilidad{},
		&models.Dia{},
		&models.Provincia{},
		&models.Localidad{},
		&models.Materia{},
		&models.Clase{},
	)
	if err != nil {
		log.Fatal("❌ Error al migrar tablas:", err)
	}

	// ---------- Provincias ----------
	mendoza := models.Provincia{Nombre: "Mendoza"}
	db.Create(&mendoza)
	bsAs := models.Provincia{Nombre: "Buenos Aires"}
	db.Create(&bsAs)
	cordoba := models.Provincia{Nombre: "Córdoba"}
	db.Create(&cordoba)

	// ---------- Materias ----------
	mat1 := models.Materia{Nombre: "Matemática"}
	db.Create(&mat1)
	mat2 := models.Materia{Nombre: "Física"}
	db.Create(&mat2)
	mat3 := models.Materia{Nombre: "Programación"}
	db.Create(&mat3)
	mat4 := models.Materia{Nombre: "Química"}
	db.Create(&mat4)
	mat5 := models.Materia{Nombre: "Historia"}
	db.Create(&mat5)

	// ---------- Profesores ----------
	prof1 := models.Profesor{Nombre: "Ignacio Wuilloud", Mail: "ignacio@utn.edu", Telefono: "2615551111"}
	db.Create(&prof1)
	prof2 := models.Profesor{Nombre: "Marcus Rashford", Mail: "marcus@utn.edu", Telefono: "2615552222"}
	db.Create(&prof2)

	// ---------- Clases ----------
	clases := []models.Clase{
		{
			Nombre:      "Matemática Básica",
			Descripcion: "Introducción a álgebra, ecuaciones y funciones.",
			ProvinciaID: mendoza.ID,
			Precio:      15000,
			Duracion:    models.Duracion60,
			Modalidad:   models.Presencial,
			Nivel:       models.Secundaria,
			ProfesorID:  prof1.ID,
			Materias:    []models.Materia{mat1, mat2},
		},
		{
			Nombre:      "Física I",
			Descripcion: "Movimiento rectilíneo, leyes de Newton y energía.",
			ProvinciaID: bsAs.ID,
			Precio:      18000,
			Duracion:    models.Duracion90,
			Modalidad:   models.Mixta,
			Nivel:       models.Universitario,
			ProfesorID:  prof2.ID,
			Materias:    []models.Materia{mat2},
		},
		{
			Nombre:      "Programación en Go",
			Descripcion: "Introducción al lenguaje Go, sintaxis y buenas prácticas.",
			ProvinciaID: cordoba.ID,
			Precio:      25000,
			Duracion:    models.Duracion120,
			Modalidad:   models.Virtual,
			Nivel:       models.Universitario,
			ProfesorID:  prof1.ID,
			Materias:    []models.Materia{mat3},
		},
		{
			Nombre:      "Química General",
			Descripcion: "Estructura atómica, enlaces y reacciones químicas.",
			ProvinciaID: mendoza.ID,
			Precio:      17000,
			Duracion:    models.Duracion75,
			Modalidad:   models.Presencial,
			Nivel:       models.PreUniversitario,
			ProfesorID:  prof2.ID,
			Materias:    []models.Materia{mat4},
		},
		{
			Nombre:      "Historia Argentina Contemporánea",
			Descripcion: "Desde el siglo XX hasta la actualidad.",
			ProvinciaID: bsAs.ID,
			Precio:      16000,
			Duracion:    models.Duracion90,
			Modalidad:   models.Mixta,
			Nivel:       models.Secundaria,
			ProfesorID:  prof1.ID,
			Materias:    []models.Materia{mat5},
		},
	}

	for _, c := range clases {
		db.Create(&c)
		log.Printf("✅ Clase '%s' creada (ProvinciaID=%d, ProfesorID=%d)", c.Nombre, c.ProvinciaID, c.ProfesorID)
	}

	log.Println("🎉 Base de datos poblada correctamente.")
}
