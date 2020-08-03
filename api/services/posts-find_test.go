package services_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
)

var db *TestDB
var postService *services.PostService

var recorder *httptest.ResponseRecorder

func Setup() {
	db = new(TestDB)
	postService = services.NewPostService(db)
	recorder = httptest.NewRecorder()
}

func TestFindPosts(t *testing.T) {
	testTable := []TestCase{
		{
			name: "One post",
			input: []models.Post{
				{Title: "Foo", Content: "Bar"},
			},
		},
		{
			name: "Two posts",
			input: []models.Post{
				{Title: "Post 1", Content: "Content of post 1"},
				{Title: "Post 2", Content: "Content of post 2"},
			},
		},
		{
			name:  "No posts",
			input: []models.Post{},
		},
	}

	for _, testCase := range testTable {
		t.Run(testCase.name, func(t *testing.T) {
			Setup()

			db.posts = testCase.input.([]models.Post)

			httpRequest, err := http.NewRequest("GET", "http://localhost:8080/posts", nil)

			if err != nil {
				t.Errorf("Unable to create httpRequest: %v", err)
			}

			postService.GetPosts(recorder, httpRequest)

			response := recorder.Result()

			var receivedPosts []models.Post
			json.NewDecoder(response.Body).Decode(&receivedPosts)

			if response.StatusCode != http.StatusOK {
				t.Errorf("Wanted status OK, got %v", response.StatusCode)
			}

			if contentType := response.Header["Content-Type"][0]; contentType != "application/json" {
				t.Errorf("Wanted application/json; got: %v", contentType)
			}

			if diff := cmp.Diff(receivedPosts, testCase.input); diff != "" {
				t.Errorf("Received posts were different from input posts:\n%s", diff)
			}
		})
	}
}
