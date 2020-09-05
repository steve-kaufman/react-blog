package services_test

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"

	"github.com/steve-kaufman/react-blog/api/models"
)

type TestDB struct {
	count int
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

func (db *TestDB) Create(post models.Post) models.Post {
	db.count++
	post.ID = db.count

	db.posts = append(db.posts, post)

	return post
}

func (db *TestDB) Update(post models.Post) (models.Post, error) {
	for i, oldPost := range db.posts {
		if oldPost.ID != post.ID {
			continue
		}

		db.posts[i] = post
	}

	return models.Post{}, errors.New("Post not found")
}

/* StructToString is a testing utility that skips error checking on
json.Marshal and converts bytes to string */
func StructToString(v interface{}) string {
	jsonBytes, _ := json.Marshal(v)

	return string(jsonBytes)
}

/* StructToReader is a testing utility that skips error checking on
json.Marshal and converts bytes to reader */
func StructToReader(v interface{}) io.Reader {
	vAsBytes, _ := json.Marshal(v)

	return bytes.NewReader(vAsBytes)
}
