package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/steve-kaufman/react-blog/api/storage"
)

// PostsController holds crud methods for the posts service
type PostsController struct {
	db storage.PostsStorage
}

// GetPosts returns all posts
func (contoller *PostsController) GetPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(contoller.db.Find())
}

// GetPost returns a single post
func (contoller *PostsController) GetPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	urlParts := strings.Split(r.URL.Path, "/")
	idStr := urlParts[len(urlParts)-1]
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err)
	}

	post, err := contoller.db.Get(id)

	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(post)
}

// NewPostsController returns a new Posts service
func NewPostsController(db storage.PostsStorage) *PostsController {
	contoller := new(PostsController)

	contoller.db = db

	return contoller
}
