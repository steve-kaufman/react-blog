package services_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
)

func TestDeletePost(t *testing.T) {
	db := new(TestDB)
	postService := services.NewPostService(db)

	for i := 1; i <= 5; i++ {
		db.posts = append(db.posts, models.Post{
			ID:      i,
			Title:   fmt.Sprintf("Post %d", i),
			Content: fmt.Sprintf("Content of post %d", i),
		})
	}

	postToDelete := db.posts[2]

	url := fmt.Sprintf("http://localhost:8080/posts/%d", postToDelete.ID)

	httpRequest, err := http.NewRequest("DELETE", url, nil)

	if err != nil {
		t.Fatalf("Couldn't create http request: %v", err)
	}

	recorder := httptest.NewRecorder()

	postService.DeletePost(recorder, httpRequest)

	response := recorder.Result()

	t.Run("Status OK", func(t *testing.T) {
		if response.StatusCode != http.StatusOK {
			t.Errorf("Expected status OK; got: %d", response.StatusCode)
		}
	})

	t.Run("Content type is json", func(t *testing.T) {
		if len(response.Header["Content-Type"]) == 0 {
			t.Fatalf("No Content-Type; Expected application/json")
		}

		contentType := response.Header["Content-Type"][0]

		if contentType != "application/json" {
			t.Errorf("Expected content type to be json; got: %v", contentType)
		}
	})

	t.Run("Deletes post from database", func(t *testing.T) {
		for _, post := range db.posts {
			if post.ID == postToDelete.ID {
				t.Errorf("Didn't delete post with ID 2")
			}
		}
	})

	t.Run("Returns deleted post in body", func(t *testing.T) {
		defer response.Body.Close()
		body, err := ioutil.ReadAll(response.Body)

		if err != nil {
			t.Fatalf("Can't read body")
		}

		var receivedPost models.Post
		json.Unmarshal(body, &receivedPost)

		if diff := cmp.Diff(receivedPost, postToDelete); diff != "" {
			t.Errorf("Didn't return deleted post: \n%s", diff)
		}
	})

	t.Run("404 when post is not found", func(t *testing.T) {
		postService = services.NewPostService(db)

		httpRequest, err :=
			http.NewRequest("GET", "http://localhost:8080/posts/0", nil)

		if err != nil {
			t.Errorf("Couldn't create httpRequest: %v", err)
		}

		recorder := httptest.NewRecorder()

		postService.DeletePost(recorder, httpRequest)

		response := recorder.Result()

		if response.StatusCode != http.StatusNotFound {
			t.Errorf("Wanted status not found; got: %d", response.StatusCode)
		}

		t.Run("No Content-Type", func(t *testing.T) {
			contentType := response.Header["Content-Type"]

			if len(contentType) != 0 {
				t.Errorf("Didn't want any content-type; got it anyway :/")
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

	t.Run("General error when id is not number", func(t *testing.T) {
		db := new(TestDB)

		postService := services.NewPostService(db)

		httpRequest, err := http.NewRequest("GET",
			"http://localhost:8080/posts/foo", nil)

		if err != nil {
			t.Errorf("Couldn't create http request")
		}

		recorder := httptest.NewRecorder()

		postService.DeletePost(recorder, httpRequest)

		response := recorder.Result()

		t.Run("Status Bad Request", func(t *testing.T) {
			if response.StatusCode != http.StatusBadRequest {
				t.Errorf("Expected bad request; got: %d", response.StatusCode)
			}
		})

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
