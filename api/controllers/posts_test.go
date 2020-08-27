package controllers_test

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/steve-kaufman/react-blog/api/controllers"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/stretchr/testify/assert"
)

type TestDB struct {
	posts []models.Post
}

func (db *TestDB) Find() []models.Post {
	return db.posts
}

func (db *TestDB) Get(id int) (models.Post, error) {
	for _, post := range db.posts {
		if post.ID == id {
			return post, nil
		}
	}

	return models.Post{}, errors.New(fmt.Sprintf("Post with id %d not found", id))
}

func Setup() (*TestDB, *controllers.PostsController) {
	db := new(TestDB)

	db.posts = []models.Post{
		{
			ID:      1,
			Title:   "Post 1",
			Content: "Content of post 1",
		},
		{
			ID:      2,
			Title:   "Post 2",
			Content: "Content of post 2",
		},
		{
			ID:      3,
			Title:   "Post 3",
			Content: "Content of post 3",
		},
	}

	postsController := controllers.NewPostsController(db)

	return db, postsController
}

func TestGetPosts(t *testing.T) {
	assert := assert.New(t)
	db, postsController := Setup()

	httpRequest, _ := http.NewRequest("GET", "http://localhost:8080/posts/",
		nil)
	recorder := httptest.NewRecorder()

	postsController.GetPosts(recorder, httpRequest)
	response := recorder.Result()

	assert.Equal(response.StatusCode, http.StatusOK)

	assert.NotEmpty(response.Header["Content-Type"])
	assert.Contains(response.Header["Content-Type"], "application/json")

	body, _ := ioutil.ReadAll(response.Body)
	var receivedPosts []models.Post
	err := json.Unmarshal(body, &receivedPosts)
	assert.Nil(err, err)

	assert.Equal(receivedPosts, db.posts)
}

func TestGetPost(t *testing.T) {
	assert := assert.New(t)
	db, postsController := Setup()

	type TestCase struct {
		id             interface{}
		expectedStatus int
		expectedPost   *models.Post
	}

	var tests []TestCase = []TestCase{
		// {id: "foo", expectedStatus: http.StatusBadRequest},
		// {id: "bar", expectedStatus: http.StatusBadRequest},
		// {id: -2, expectedStatus: http.StatusNotFound},
		// {id: 0, expectedStatus: http.StatusNotFound},
		// {id: 4, expectedStatus: http.StatusNotFound},
		// {id: 4, expectedStatus: http.StatusNotFound},
		// {id: 5, expectedStatus: http.StatusNotFound},
		// {id: 10, expectedStatus: http.StatusNotFound},
	}

	for _, post := range db.posts {
		fmt.Println(post)
		tests = append(tests, TestCase{
			id:             post.ID,
			expectedStatus: 200,
			expectedPost:   &post,
		})
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://localhost:8080/posts/%v", test.id)
		httpRequest, _ := http.NewRequest("GET", url, nil)
		recorder := httptest.NewRecorder()

		postsController.GetPost(recorder, httpRequest)
		response := recorder.Result()

		assert.Equal(response.StatusCode, test.expectedStatus)

		if test.expectedPost != nil {
			assert.NotEmpty(response.Header["Content-Type"])
			assert.Contains(response.Header["Content-Type"], "application/json")

			body, _ := ioutil.ReadAll(response.Body)
			var receivedPost models.Post
			err := json.Unmarshal(body, &receivedPost)
			assert.Nil(err, err)

			assert.Equal(*test.expectedPost, receivedPost)
		} else {
			assert.NotContains(response.Header["Content-Type"], "application/json")

			body, _ := ioutil.ReadAll(response.Body)
			assert.Empty(body)
		}
	}
}
