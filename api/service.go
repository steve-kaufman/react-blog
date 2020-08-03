package main

import (
	"net/http"

	"github.com/jinzhu/gorm"
)

// Service is an interface from which crud services may inherit
type Service interface {
	find(w http.ResponseWriter, r *http.Request)
	get(w http.ResponseWriter, r *http.Request)
	post(w http.ResponseWriter, r *http.Request)
	update(w http.ResponseWriter, r *http.Request)
	delete(w http.ResponseWriter, r *http.Request)
	Setup(db *gorm.DB)
}
