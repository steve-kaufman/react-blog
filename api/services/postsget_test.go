package services_test

import (
	"fmt"
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

	type expected struct {
		code int
		body string
	}

	type TestCase struct {
		name         string
		inputID      interface{}
		expectedCode int
		expectedBody string
	}

	tests := []TestCase{
		{
			name:         "Post 1",
			inputID:      1,
			expectedCode: 200,
			expectedBody: StructToString(db.posts[0]),
		},
		{
			name:         "Post 2",
			inputID:      2,
			expectedCode: 200,
			expectedBody: StructToString(db.posts[1]),
		},
		{
			name:         "Post 3",
			inputID:      3,
			expectedCode: 200,
			expectedBody: StructToString(db.posts[2]),
		},
		{
			name:         "Post 0 Not Found",
			inputID:      0,
			expectedCode: 404,
			expectedBody: services.ObjectNotFoundError,
		},
		{
			name:         "Post 4 Not Found",
			inputID:      4,
			expectedCode: 404,
			expectedBody: services.ObjectNotFoundError,
		},
		{
			name:         "String ID Error",
			inputID:      "foo",
			expectedCode: 400,
			expectedBody: services.InvalidIDError,
		},
		{
			name:         "Mixed String and Int ID Error",
			inputID:      "1foo2",
			expectedCode: 400,
			expectedBody: services.InvalidIDError,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			postsService := services.NewPostsService(db)

			router := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			url := fmt.Sprintf("/posts/%v", test.inputID)
			req, _ := http.NewRequest("GET", url, nil)

			router.ServeHTTP(w, req)

			assert.Equal(t, test.expectedCode, w.Code)
			assert.Equal(t, test.expectedBody, w.Body.String())
		})
	}
}
