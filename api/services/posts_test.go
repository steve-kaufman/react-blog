package services_test

import (
	"encoding/json"

	"github.com/steve-kaufman/react-blog/api/models"
)

type TestDB struct {
	posts []models.Post
}

func (db *TestDB) Find() []models.Post {
	return db.posts
}

/* StructToString is a testing utility that skips error checking on
json.Marshal */
func StructToString(v interface{}) string {
	jsonBytes, _ := json.Marshal(v)

	return string(jsonBytes)
}

type TestCase struct {
	name     string
	input    interface{}
	expected interface{}
}
