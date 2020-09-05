package services_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
	"github.com/stretchr/testify/assert"
)

func TestPostsUpdate(t *testing.T) {
	type TestCase struct {
		name             string
		existingPosts    []models.Post
		inputReqBody     interface{}
		inputID          int
		expectedResponse models.Post
	}

	tests := []TestCase{
		{
			name: "Title change, one post in database",
			existingPosts: []models.Post{
				{
					ID:      1,
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
			inputReqBody: struct{ Title string }{Title: "foo"},
			inputID:      1,
			expectedResponse: models.Post{
				ID:      1,
				Title:   "foo",
				Content: "Content of Post 1",
			},
		},
		{
			name: "Content change, one post in database",
			existingPosts: []models.Post{
				{
					ID:      1,
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
			inputReqBody: struct{ Content string }{Content: "bar"},
			inputID:      1,
			expectedResponse: models.Post{
				ID:      1,
				Title:   "Post 1",
				Content: "bar",
			},
		},
		{
			name: "Change title of first post with two in database",
			existingPosts: []models.Post{
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
			inputReqBody: struct{ Title string }{Title: "foo"},
			inputID:      1,
			expectedResponse: models.Post{
				ID:      1,
				Title:   "foo",
				Content: "Content of Post 1",
			},
		},
		{
			name: "Change title of second post with two in database",
			existingPosts: []models.Post{
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
			inputReqBody: struct{ Title string }{Title: "foo"},
			inputID:      2,
			expectedResponse: models.Post{
				ID:      2,
				Title:   "foo",
				Content: "Content of Post 2",
			},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db := new(TestDB)
			db.posts = test.existingPosts
			postsService := services.NewPostsService(db)

			router := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			reqBodyAsReader := StructToReader(test.inputReqBody)
			url := fmt.Sprintf("/posts/%d", test.inputID)
			req, _ := http.NewRequest("PATCH", url, reqBodyAsReader)

			router.ServeHTTP(w, req)

			postInDB, _ := db.Get(test.inputID)

			assert.Equal(t, 200, w.Code)
			assert.Equal(t, StructToString(test.expectedResponse), w.Body.String())
			assert.Equal(t, test.expectedResponse, postInDB)
		})
	}
}

func TestPostsUpdate404(t *testing.T) {
	type TestCase struct {
		name          string
		existingPosts []models.Post
		inputID       int
	}

	tests := []TestCase{
		{
			name: "ID 0",
			existingPosts: []models.Post{
				{
					ID:      1,
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
			inputID: 0,
		},
		{
			name: "Out of bounds ID 2",
			existingPosts: []models.Post{
				{
					ID:      1,
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
			inputID: 2,
		},
		{
			name: "Out of bounds ID 3",
			existingPosts: []models.Post{
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
			inputID: 3,
		},
		{
			name: "Out of bounds ID 100",
			existingPosts: []models.Post{
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
			inputID: 100,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db := new(TestDB)
			db.posts = test.existingPosts
			postsService := services.NewPostsService(db)

			router := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			reqBodyAsReader := StructToReader(struct{ Title string }{Title: "foo"})
			url := fmt.Sprintf("/posts/%d", test.inputID)
			req, _ := http.NewRequest("PATCH", url, reqBodyAsReader)

			router.ServeHTTP(w, req)

			assert.Equal(t, 404, w.Code)
			assert.Empty(t, w.Body.String())
		})
	}
}

func TestPostsUpdate400_WhenIDIsntInt(t *testing.T) {
	db := new(TestDB)
	postsService := services.NewPostsService(db)

	router := postsService.Route(gin.Default())

	w := httptest.NewRecorder()
	reqBodyAsReader := StructToReader(struct{ Title string }{Title: "foo"})
	url := fmt.Sprintf("/posts/foo")
	req, _ := http.NewRequest("PATCH", url, reqBodyAsReader)

	router.ServeHTTP(w, req)

	assert.Equal(t, 400, w.Code)
	assert.Empty(t, w.Body.String())
}
