package storage

import (
	"github.com/jinzhu/gorm"

	// Sqlite driver
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// CreateDatabase returns a pointer to a gorm database
func CreateDatabase() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./blog.db")

	if err != nil {
		panic(err)
	}

	db.LogMode(true)

	// db = db.Set("gorm:auto_preload", true)

	// db.AutoMigrate(&Post{})

	return db
}
