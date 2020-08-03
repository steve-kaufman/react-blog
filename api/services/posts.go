package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/storage"
)

// PostService contains the CRUD methods for posts
type PostService struct {
	db storage.Storage
}

// GetPosts writes an array of posts in the response body
func (service *PostService) GetPosts(w http.ResponseWriter, r *http.Request) {
	posts := service.db.Find("posts").([]models.Post)

	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GetPost returns a single post
func (service *PostService) GetPost(w http.ResponseWriter, r *http.Request) {
	urlParts := strings.Split(r.URL.Path, "/")
	idStr := urlParts[len(urlParts)-1]

	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	post, err := service.db.Get(id)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// CreatePost creates a post and then returns it in the body
func (service *PostService) CreatePost(w http.ResponseWriter, r *http.Request) {
	var postData models.Post
	json.NewDecoder(r.Body).Decode(&postData)

	post := service.db.Create(models.Post{
		Title:   postData.Title,
		Content: postData.Content,
	}).(models.Post)

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

// PatchPost updates a post
func (service *PostService) PatchPost(w http.ResponseWriter, r *http.Request) {
	urlParts := strings.Split(r.URL.Path, "/")
	idStr := urlParts[len(urlParts)-1]

	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	post, err := service.db.Patch(id, data)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(post)
}

// DeletePost deletes a post and returns it in the body
func (service *PostService) DeletePost(w http.ResponseWriter, r *http.Request) {
	urlParts := strings.Split(r.URL.Path, "/")
	idStr := urlParts[len(urlParts)-1]

	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	post, err := service.db.Delete(id)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// NewPostService returns a new PostService object
func NewPostService(db storage.Storage) *PostService {
	posts := new(PostService)
	posts.db = db

	return posts
}
