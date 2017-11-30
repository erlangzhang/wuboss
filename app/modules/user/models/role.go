package models

import (
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var RoleVO = common.DB("wushu").C("role")

type Role struct {
	Id          bson.ObjectId            `bson:"_id"`
	Name        string                   `bson:"name"`
	Permissions []string                 `bson:"permissions"`
	Allow       []map[string]interface{} `bson:"allow"`
	Status      int64                    `bson:status`
	CreatedAt   int64                    `bson:"createdAt"`
	UpdatedAt   int64                    `bson:"updatedAt"`
}
