package services_test

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/services"
)

type BadReadCloser struct {
}

func (r *BadReadCloser) Read(p []byte) (n int, err error) {
	return 0, errors.New("Error!")
}

func (r *BadReadCloser) Close() error {
	return errors.New("Error!")
}

func structToReader(v interface{}) (io.Reader, error) {
	jsonBytes, err := json.Marshal(v)

	if err != nil {
		return nil, errors.New("Couldn't marshall JSON")
	}

	return bytes.NewBuffer(jsonBytes), nil
}

func TestUpdatePost(t *testing.T) {
	db := new(TestDB)
	postService := services.NewPostService(db)

	for i := 1; i <= 5; i++ {
		db.posts = append(db.posts, models.Post{
			ID:      i,
			Title:   fmt.Sprintf("Post %d", i),
			Content: fmt.Sprintf("Content of post %d", i),
		})
	}

	for i, post := range db.posts {
		t.Run(fmt.Sprintf("Post %d", post.ID), func(t *testing.T) {
			dummyData := struct{ Title string }{
				Title: "Foo",
			}

			buf, err := structToReader(dummyData)

			if err != nil {
				t.Fatal(err)
			}

			url := fmt.Sprintf("http://localhost:8080/posts/%d", post.ID)

			httpRequest, err := http.NewRequest("PATCH", url, buf)

			if err != nil {
				t.Fatal(err)
			}

			recorder = httptest.NewRecorder()

			postService.PatchPost(recorder, httpRequest)

			response := recorder.Result()

			t.Run("Status OK", func(t *testing.T) {
				if response.StatusCode != http.StatusOK {
					t.Errorf("Wanted Status OK; got: %d", response.StatusCode)
				}
			})

			t.Run("Title is changed", func(t *testing.T) {
				if db.posts[i].Title != "Foo" {
					t.Errorf("Title was not changed; \nExpected: Foo\nGot: %s",
						post.Title)
				}
			})

			t.Run("Content is not changed", func(t *testing.T) {
				if db.posts[i].Content != post.Content {
					t.Errorf("Content was changed; \nExpected: %s\nGot: %s",
						post.Content,
						db.posts[i].Content)
				}
			})

			t.Run("ID is not changed", func(t *testing.T) {
				if db.posts[i].ID != post.ID {
					t.Errorf("ID was changed; \nExpected: %d\nGot: %d",
						post.ID, db.posts[i].ID)
				}
			})

			t.Run("Received post is same as post in database", func(t *testing.T) {
				var receivedPost models.Post
				defer response.Body.Close()
				body, err := ioutil.ReadAll(response.Body)
				if err != nil {
					t.Fatalf("Can't read body")
				}
				json.Unmarshal(body, &receivedPost)
				if diff := cmp.Diff(receivedPost, db.posts[i]); diff != "" {
					t.Errorf("Post did not match expected: \n%s", diff)
				}
			})
		})
	}

	t.Run("Non-existant Post", func(t *testing.T) {
		url := fmt.Sprintf("http://localhost:8080/posts/%d", len(db.posts)+1)
		httpRequest, err := http.NewRequest("PATCH", url,
			bytes.NewBuffer([]byte("")))

		if err != nil {
			t.Fatalf("Couldn't generate http request: %v", err)
		}

		recorder := httptest.NewRecorder()

		postService.PatchPost(recorder, httpRequest)

		response := recorder.Result()

		t.Run("Status Not Found", func(t *testing.T) {
			if response.StatusCode != http.StatusNotFound {
				t.Errorf("Expected status not found; got: %d", response.StatusCode)
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

		dummyData := struct{ Title string }{
			Title: "Foo",
		}

		buf, _ := structToReader(dummyData)

		httpRequest, err := http.NewRequest("PATCH",
			"http://localhost:8080/posts/foo", buf)

		if err != nil {
			t.Errorf("Couldn't create http request")
		}

		recorder := httptest.NewRecorder()

		postService.PatchPost(recorder, httpRequest)

		response := recorder.Result()

		t.Run("Status bad request", func(t *testing.T) {
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

	t.Run("Error reading r.Body", func(t *testing.T) {
		db := new(TestDB)
		postService := services.NewPostService(db)

		httpRequest, err := http.NewRequest("PATCH",
			"http://localhost:8080/posts/1", new(BadReadCloser))

		if err != nil {
			t.Fatalf("Couldn't create http request")
		}

		recorder := httptest.NewRecorder()

		postService.PatchPost(recorder, httpRequest)

		response := recorder.Result()

		t.Run("Bad Request", func(t *testing.T) {
			if response.StatusCode != http.StatusBadRequest {
				t.Errorf("Expected bad request; got: %d", response.StatusCode)
			}
		})

		if db.wasQueried {
			t.Errorf("Database was queried")
		}
	})
}
