package services_test

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
	"github.com/stretchr/testify/assert"
)

func StructToReader(v interface{}) io.Reader {
	vAsBytes, _ := json.Marshal(v)

	return bytes.NewReader(vAsBytes)
}

func TestCreatePost(t *testing.T) {
	type TestCase struct {
		name         string
		postsInDB    []models.Post
		inputTitle   string
		inputContent string
		expectedID   int
	}

	tests := []TestCase{
		{
			name:         "No posts in DB",
			inputTitle:   "foo",
			inputContent: "bar",
			expectedID:   1,
		},
		{
			name: "One post already in DB",
			postsInDB: []models.Post{
				{
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
			},
			inputTitle:   "foo",
			inputContent: "bar",
			expectedID:   2,
		},
		{
			name: "Two posts already in DB",
			postsInDB: []models.Post{
				{
					Title:   "Post 1",
					Content: "Content of Post 1",
				},
				{
					Title:   "Post 2",
					Content: "Content of Post 2",
				},
			},
			inputTitle:   "foo",
			inputContent: "bar",
			expectedID:   3,
		},
		{
			name:         "With different title and content",
			inputTitle:   "interesting title",
			inputContent: "random content",
			expectedID:   1,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db := new(TestDB)
			for _, post := range test.postsInDB {
				db.Create(post)
			}
			postsService := services.NewPostsService(db)

			router := postsService.Route(gin.Default())

			w := httptest.NewRecorder()
			req, _ := http.NewRequest("POST", "/posts", StructToReader(models.Post{
				Title:   test.inputTitle,
				Content: test.inputContent,
			}))

			router.ServeHTTP(w, req)

			assert.Equal(t, 201, w.Code)
			assert.Equal(t, StructToString(models.Post{
				ID:      test.expectedID,
				Title:   test.inputTitle,
				Content: test.inputContent,
			}), w.Body.String())
		})
	}
}
