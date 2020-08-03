package storage

import "github.com/steve-kaufman/react-blog/api/models"

// ErrorNotFound error
const ErrorNotFound string = "Object not found"

// ErrorGeneral error
const ErrorGeneral string = "Error"

// Storage is the interface from which all storage adaptors inherit
type Storage interface {
	Find(model string) interface{}
	Get(id int) (models.Model, error)
	Create(object models.Model) models.Model
	Patch(id int, data []byte) (models.Model, error)
	Delete(id int) (models.Model, error)
}
