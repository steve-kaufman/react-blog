package services_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
)

func TestCreatePost(t *testing.T) {
	db = new(TestDB)

	postService = services.NewPostService(db)

	dummyPost := models.Post{
		Title:   "Post 1",
		Content: "Content of Post 1",
	}

	jsonBytes, err := json.Marshal(dummyPost)

	if err != nil {
		t.Errorf("Couldn't marshal json")
	}

	buf := bytes.NewBuffer(jsonBytes)

	httpRequest, err := http.NewRequest("POST", "http://localhost:8080/posts/", buf)

	if err != nil {
		t.Fatalf("Couldn't create http request: %v", err)
	}

	recorder = httptest.NewRecorder()

	db.posts = []models.Post{}

	postService.CreatePost(recorder, httpRequest)

	response := recorder.Result()

	t.Run("Status Created", func(t *testing.T) {
		if response.StatusCode != http.StatusCreated {
			t.Errorf("Expected Status Created; got %d", response.StatusCode)
		}
	})

	var post models.Post

	t.Run("Creates a post in database", func(t *testing.T) {
		if len(db.posts) != 1 {
			t.Fatalf("Expected one post to be created: %d were created", len(db.posts))
		}

		post = db.posts[0]

		t.Run("Title matches", func(t *testing.T) {
			if post.Title != dummyPost.Title {
				t.Errorf(
					"Post was created with wrong Title: \nExpected: \t%s\nActual: \t%s",
					dummyPost.Title,
					post.Title,
				)
			}
		})

		t.Run("Content matches", func(t *testing.T) {
			if post.Content != dummyPost.Content {
				t.Errorf(
					"Post was created with wrong Content: \nExpected: \t%s\nActual: \t%s",
					dummyPost.Content,
					post.Content,
				)
			}
		})
	})

	t.Run("Content-Type json", func(t *testing.T) {
		if contentType := response.Header["Content-Type"][0]; contentType != "application/json" {
			t.Errorf("Expected application/json; got: %v", contentType)
		}
	})

	t.Run("Returns created post in body", func(t *testing.T) {
		var receivedPost models.Post
		json.NewDecoder(response.Body).Decode(&receivedPost)

		if diff := cmp.Diff(post, receivedPost); diff != "" {
			t.Errorf("Received post does not match: \n%s", diff)
		}
	})
}
