package services_test

import (
	"encoding/json"
	"errors"

	"github.com/steve-kaufman/react-blog/api/models"
)

type TestDB struct {
	posts []models.Post
}

func (db *TestDB) Find() []models.Post {
	return db.posts
}

func (db *TestDB) Get(id int) (models.Post, error) {
	for _, post := range db.posts {
		if post.ID == id {
			return post, nil
		}
	}

	return models.Post{}, errors.New("Post not found")
}

/* StructToString is a testing utility that skips error checking on
json.Marshal */
func StructToString(v interface{}) string {
	jsonBytes, _ := json.Marshal(v)

	return string(jsonBytes)
}
