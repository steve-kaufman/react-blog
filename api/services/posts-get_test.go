package services_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
)

func TestGetPost(t *testing.T) {
	db = new(TestDB)

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

	for _, post := range db.posts {
		testName := fmt.Sprintf("Post #%d", post.ID)
		t.Run(testName, func(t *testing.T) {
			postService = services.NewPostService(db)

			url := fmt.Sprintf("http://localhost:8080/posts/%d", post.ID)
			httpRequest, err := http.NewRequest("GET", url, nil)

			if err != nil {
				t.Errorf("Could not create httpRequest: %v", err)
			}

			recorder = httptest.NewRecorder()

			postService.GetPost(recorder, httpRequest)

			response := recorder.Result()

			if response.StatusCode != http.StatusOK {
				t.Errorf("Wanted Status OK, got: %v", response.StatusCode)
			}

			contentType := response.Header["Content-Type"]

			if len(contentType) == 0 {
				t.Errorf("Wanted application/json; got no content-type")
			} else if contentType[0] != "application/json" {
				t.Errorf("Wanted application/json; got: %v", contentType)
			}

			var receivedPost models.Post
			json.NewDecoder(response.Body).Decode(&receivedPost)

			if diff := cmp.Diff(receivedPost, post); diff != "" {
				t.Errorf("Expected to receive post %d, diff:\n%s", post.ID, diff)
			}
		})
	}

	t.Run("404 when post is not found", func(t *testing.T) {
		postService = services.NewPostService(db)

		httpRequest, err :=
			http.NewRequest("GET", "http://localhost:8080/posts/0", nil)

		if err != nil {
			t.Errorf("Couldn't create httpRequest: %v", err)
		}

		recorder := httptest.NewRecorder()

		postService.GetPost(recorder, httpRequest)

		response := recorder.Result()

		if response.StatusCode != http.StatusNotFound {
			t.Errorf("Wanted status not found; got: %d", response.StatusCode)
		}

		contentType := response.Header["Content-Type"]

		if len(contentType) != 0 {
			t.Errorf("Didn't want any content-type; got it anyway :/")
		}

		t.Run("No body", func(t *testing.T) {
			body := new(bytes.Buffer)
			body.ReadFrom(response.Body)

			if body.String() != "" {
				t.Errorf("A body was returned")
			}
		})
	})

	t.Run("General error when id is not number", func(t *testing.T) {
		db := new(TestDB)

		postService := services.NewPostService(db)

		httpRequest, err := http.NewRequest("GET",
			"http://localhost:8080/posts/foo", nil)

		if err != nil {
			t.Errorf("Couldn't create http request")
		}

		recorder := httptest.NewRecorder()

		postService.GetPost(recorder, httpRequest)

		response := recorder.Result()

		if response.StatusCode != http.StatusBadRequest {
			t.Errorf("Expected bad request; got: %d", response.StatusCode)
		}

		t.Run("Database is not queried", func(t *testing.T) {
			if db.wasQueried {
				t.Errorf("Database was queried even though id is invalid")
			}
		})

		t.Run("No body", func(t *testing.T) {
			body := new(bytes.Buffer)
			body.ReadFrom(response.Body)

			if body.String() != "" {
				t.Errorf("A body was returned")
			}
		})
	})
}
