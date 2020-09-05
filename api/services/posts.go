package services

import (
	"encoding/json"
	"io/ioutil"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/steve-kaufman/react-blog/api/models"
	"github.com/steve-kaufman/react-blog/api/storage"
)

// PostsService holds crud methods for posts
type PostsService struct {
	db storage.PostsStorage
}

func (service *PostsService) find(c *gin.Context) {
	c.JSON(200, service.db.Find())
}

func (service *PostsService) get(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.String(400, InvalidIDError)
		return
	}

	post, err := service.db.Get(id)

	if err != nil {
		c.String(404, ObjectNotFoundError)
		return
	}

	c.JSON(200, post)
}

func (service *PostsService) create(c *gin.Context) {
	var post models.Post
	body, _ := ioutil.ReadAll(c.Request.Body)
	json.Unmarshal(body, &post)

	c.JSON(201, service.db.Create(post))
}

func (service *PostsService) update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.Status(400)
		return
	}

	post, err := service.db.Get(id)

	if err != nil {
		c.Status(404)
		return
	}

	// Parse JSON body into Post object
	body, _ := ioutil.ReadAll(c.Request.Body)
	json.Unmarshal(body, &post)

	service.db.Update(post)

	c.JSON(200, post)
}

// Route sets up routes for the posts service
func (service *PostsService) Route(router *gin.Engine) *gin.Engine {
	router.GET("/posts", service.find)
	router.GET("/posts/:id", service.get)
	router.POST("/posts", service.create)
	router.PATCH("/posts/:id", service.update)

	return router
}

// NewPostsService returns a new posts service
func NewPostsService(db storage.PostsStorage) *PostsService {
	service := new(PostsService)

	service.db = db

	return service
}
