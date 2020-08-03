package services_test

import (
	"encoding/json"
	"errors"

	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/storage"
)

type TestCase struct {
	name     string
	input    interface{}
	expected interface{}
}

type TestDB struct {
	count      int
	posts      []models.Post
	wasQueried bool
}

func (db *TestDB) Find(service string) interface{} {
	db.wasQueried = true

	posts := make([]models.Post, len(db.posts))
	copy(posts, db.posts)
	return posts
}

func (db *TestDB) Get(id int) (models.Model, error) {
	db.wasQueried = true

	var post models.Post

	for _, item := range db.posts {
		if item.ID == id {
			post = item
		}
	}

	if (post == models.Post{}) {
		return nil, errors.New(storage.ErrorNotFound)
	}

	return post, nil
}

func (db *TestDB) Create(model models.Model) models.Model {
	db.wasQueried = true

	post := model.(models.Post)

	db.count++
	post.ID = db.count

	db.posts = append(db.posts, post)

	return post
}

func (db *TestDB) Patch(id int, data []byte) (models.Model, error) {
	db.wasQueried = true

	for i, post := range db.posts {
		if post.ID != id {
			continue
		}

		json.Unmarshal(data, &post)

		db.posts[i] = post

		return post, nil
	}

	return nil, errors.New(storage.ErrorNotFound)
}

func (db *TestDB) Delete(id int) (models.Model, error) {
	db.wasQueried = true

	for i, post := range db.posts {
		if post.ID != id {
			continue
		}

		db.posts = append(db.posts[:i], db.posts[i+1:]...)

		return post, nil
	}
	return nil, errors.New(storage.ErrorNotFound)
}
