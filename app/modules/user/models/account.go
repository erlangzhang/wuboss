package models

import (
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var AccountVO = common.DB("wushu").C("account")

type Account struct {
	Id            bson.ObjectId       `bson:"_id"`
	Account       string              `bson:"account"`
	Name          string              `bson:"name"`
	Password      string              `bson:"password"`
	Department    string              `bson:"department"`
	Telephone     string              `bson:"telephone"`
	Status        int64               `bson:"status"`
	LastLoginTime int64               `bson:"lastLoginTime"`
	LastLoginIP   string              `bson:"lastLoginIP"`
	Roles         []map[string]string `bson:"roles"`
	HotelGroups   []map[string]string `bson:"hotelGroups"`
	Type          int64               `bson:"type"`
	CreatedAt     int64               `bson:"createdAt"`
	UpdatedAt     int64               `bson:"updatedAt"`
}
