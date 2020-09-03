package services_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gin-gonic/gin"

	"github.com/steve-kaufman/react-blog/api/services"

	"github.com/steve-kaufman/react-blog/api/models"
)

func TestGetPost(t *testing.T) {
	db := new(TestDB)

	db.posts = []models.Post{
		{
			ID:      1,
			Title:   "Post 1",
			Content: "Content of Post 1",
		},
		{
			ID:      2,
			Title:   "Post 2",
			Content: "Content of Post 2",
		},
		{
			ID:      3,
			Title:   "Post 3",
			Content: "Content of Post 3",
		},
	}

	postsService := services.NewPostsService(db)

	router := postsService.Route(gin.Default())

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/posts/1", nil)

	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, StructToString(db.posts[0]), w.Body.String())
}
