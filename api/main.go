package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Printf("Couldn't load .env")
	}

	// Statically serve react app on /
	reactDir := os.Getenv("REACT_DIR")
	http.Handle("/", http.FileServer(http.Dir(reactDir)))

	// Start server
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
