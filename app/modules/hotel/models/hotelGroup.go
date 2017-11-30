package models

import (
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var HotelGroupVO = common.DB("wushu").C("hotelgroup")

type HotelGroup struct {
	Id        bson.ObjectId `bson:"_id"`
	Name      string        `bson:"name"`
	HotelIds  []string      `bson:"hotelIds"`
	Status    int64         `bson:"status"`
	CreatedAt int64         `bson:"createdAt"`
	UpdatedAt int64         `bson:"updatedAt"`
}
