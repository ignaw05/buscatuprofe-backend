package main

import (
	"log"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"buscatuprofe/internal/models"
)

func main() {
	db, err := gorm.Open(sqlite.Open("buscatuprofe.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Error al conectar con la base de datos:", err)
	}

	// 🔹 Migrar esquema (incluye tabla many2many profesor_titulos automáticamente)
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

	// Helper para crear horas
	baseDate := time.Date(2000, 1, 1, 0, 0, 0, 0, time.Local)
	t := func(hh, mm int) time.Time {
		return time.Date(baseDate.Year(), baseDate.Month(), baseDate.Day(), hh, mm, 0, 0, time.Local)
	}

	// ---------- Provincias ----------
	mendoza := models.Provincia{Nombre: "Mendoza"}
	bsAs := models.Provincia{Nombre: "Buenos Aires"}
	cordoba := models.Provincia{Nombre: "Córdoba"}
	db.Create(&[]models.Provincia{mendoza, bsAs, cordoba})

	// ---------- Días ----------
	dias := []models.Dia{
		{Nombre: "Lunes"},
		{Nombre: "Martes"},
		{Nombre: "Miércoles"},
		{Nombre: "Jueves"},
		{Nombre: "Viernes"},
		{Nombre: "Sábado"},
	}
	db.Create(&dias)

	// ---------- Materias ----------
	mat1 := models.Materia{Nombre: "Matemática"}
	mat2 := models.Materia{Nombre: "Física"}
	mat3 := models.Materia{Nombre: "Programación"}
	mat4 := models.Materia{Nombre: "Química"}
	mat5 := models.Materia{Nombre: "Historia"}
	db.Create(&[]models.Materia{mat1, mat2, mat3, mat4, mat5})

	// ---------- Títulos ----------
	tIngSis := models.Titulo{Nombre: "Ingeniero en Sistemas"}
	tProfMat := models.Titulo{Nombre: "Profesor en Matemática"}
	tLicFis := models.Titulo{Nombre: "Licenciado en Física"}
	tProfEdFis := models.Titulo{Nombre: "Profesor en Educación Física"}
	db.Create(&[]models.Titulo{tIngSis, tProfMat, tLicFis, tProfEdFis})

	// ---------- Profesores ----------
	prof1 := models.Profesor{
		Nombre:   "Ignacio Wuilloud",
		Mail:     "ignacio@utn.edu",
		Telefono: "2615551111",
	}
	prof2 := models.Profesor{
		Nombre:   "Marcus Rashford",
		Mail:     "marcus@utn.edu",
		Telefono: "2615552222",
	}
	db.Create(&prof1)
	db.Create(&prof2)

	// ✅ Asociar títulos (many2many) — importante hacerlo después de que los profesores tengan ID
	if err := db.Model(&prof1).Association("Titulos").Append(&tIngSis, &tProfMat); err != nil {
		log.Fatal("❌ Error asociando títulos a Ignacio:", err)
	}
	if err := db.Model(&prof2).Association("Titulos").Append(&tLicFis, &tProfEdFis); err != nil {
		log.Fatal("❌ Error asociando títulos a Marcus:", err)
	}

	// ---------- Disponibilidades ----------
	disponibilidades := []models.ProfesorDisponibilidad{
		{ProfesorID: prof1.ID, DiaID: dias[0].ID, HoraDesde: t(9, 0), HoraHasta: t(12, 0)},  // Lunes 9-12
		{ProfesorID: prof1.ID, DiaID: dias[2].ID, HoraDesde: t(14, 0), HoraHasta: t(17, 0)}, // Miércoles 14-17
		{ProfesorID: prof2.ID, DiaID: dias[1].ID, HoraDesde: t(10, 0), HoraHasta: t(13, 0)}, // Martes 10-13
		{ProfesorID: prof2.ID, DiaID: dias[4].ID, HoraDesde: t(15, 0), HoraHasta: t(18, 0)}, // Viernes 15-18
	}
	db.Create(&disponibilidades)

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

	log.Println("🎉 Base poblada correctamente con profesores, títulos, disponibilidades, días, materias y clases.")
}
