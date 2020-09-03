package services_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
	"github.com/stretchr/testify/assert"
)

type TestDB struct {
	posts []models.Post
}

func (db *TestDB) Find() []models.Post {
	return db.posts
}

func structToString(v interface{}) string {
	jsonBytes, _ := json.Marshal(v)

	return string(jsonBytes)
}

func TestFindPosts(t *testing.T) {
	db := new(TestDB)

	db.posts = []models.Post{
		{
			ID:      "1",
			Title:   "Post 1",
			Content: "Content of Post 1",
		},
		{
			ID:      "2",
			Title:   "Post 2",
			Content: "Content of Post 2",
		},
		{
			ID:      "3",
			Title:   "Post 3",
			Content: "Content of Post 3",
		},
	}

	postsService := services.NewPostsService(db)
	r := postsService.Route(gin.Default())

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/posts", nil)

	r.ServeHTTP(w, req)

	postsInDB := structToString(db.posts)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, postsInDB, w.Body.String())
}
