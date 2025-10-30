package db

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"buscatuprofe/internal/models"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("buscatuprofe.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Error conectando a la base de datos:", err)
	}

	err = DB.AutoMigrate(&models.Clase{})
	if err != nil {
		log.Fatal("❌ Error al migrar modelos:", err)
	}

	log.Println("✅ Base de datos conectada y migrada correctamente.")
}
