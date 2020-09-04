package services_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
	"github.com/stretchr/testify/assert"
)

func TestFindPosts(t *testing.T) {
	type TestCase struct {
		name       string
		inputPosts []models.Post
	}

	var tests = []TestCase{
		{
			name:       "No posts",
			inputPosts: []models.Post{},
		},
		{
			name: "1 post",
			inputPosts: []models.Post{
				{
					ID:      1,
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
		},
		{
			name: "2 posts",
			inputPosts: []models.Post{
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
			},
		},
		{
			name: "3 posts",
			inputPosts: []models.Post{
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
			},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db := new(TestDB)

			db.posts = test.inputPosts

			postsService := services.NewPostsService(db)
			r := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			req, _ := http.NewRequest("GET", "/posts", nil)

			r.ServeHTTP(w, req)

			inputPostsStr := StructToString(test.inputPosts)

			assert.Equal(t, 200, w.Code)
			assert.Equal(t, inputPostsStr, w.Body.String())
		})
	}
}
