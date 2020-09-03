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

var tests = []TestCase{
	{
		name:  "No posts",
		input: []models.Post{},
	},
	{
		name: "1 post",
		input: []models.Post{
			{
				ID:      1,
				Title:   "Post 1",
				Content: "Content of Post 1",
			},
		},
	},
	{
		name: "2 posts",
		input: []models.Post{
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
		input: []models.Post{
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

func TestFindPosts(t *testing.T) {
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db := new(TestDB)

			db.posts = test.input.([]models.Post)

			postsService := services.NewPostsService(db)
			r := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			req, _ := http.NewRequest("GET", "/posts", nil)

			r.ServeHTTP(w, req)

			postsAsString := StructToString(test.input)

			assert.Equal(t, 200, w.Code)
			assert.Equal(t, postsAsString, w.Body.String())
		})
	}
}
