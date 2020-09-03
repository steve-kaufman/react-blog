package storage

import "github.com/steve-kaufman/react-blog/api/models"

// PostsStorage is the interface all storage adapters inherit
type PostsStorage interface {
	Find() []models.Post
}
