package models

import (
	"gopkg.in/mgo.v2/bson"

	"work-codes/wushu/app/common"
)

var LogVO = common.DB("wushu").C("log")

type Log struct {
	Id        bson.ObjectId `bson:"_id"`
	AccountId string        `bson:"accountId"`
	Name      string        `bson:"name"`
	Url       string        `bson:"url"`
	Method    string        `bson:method`
	Params    bson.M        `bson:params`
	Code      int64         `bson:code`
	Message   string        `bson:message`
	Ip        string        `bson:id`
	CreatedAt int64         `bson:"createdAt"`
}
