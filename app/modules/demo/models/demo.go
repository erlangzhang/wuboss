package models

import (
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var DemoVO = common.DB("wushu").C("demo")

type Demo struct {
	Id   bson.ObjectId `bson:"_id"`
	Name string        `bson:"name"`
	Pwd  string        `bson:"pwd"`
}
