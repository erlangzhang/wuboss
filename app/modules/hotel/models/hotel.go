package models

import (
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var HotelVO = common.DB("wushu").C("hotel")

type Hotel struct {
	Id              bson.ObjectId `bson:"_id"`
	Name            string        `bson:"name"`
	HostId          int64         `bson:"hostId"`
	HotelType       string        `bson:"hotelType"`
	Stars           int64         `bson:"stars"`
	CtripStars      int64         `bson:"ctripStars"`
	ContactName     string        `bson:"contactName"`
	PhoneNumber     string        `bson:"phoneNumber"`
	RoomsCount      int64         `bson:"roomsCount"`
	DetailAddress   string        `bson:"detailAddress"`
	Description     string        `bson:"description"`
	Province        int64         `bson:"province"`
	City            int64         `bson:"city"`
	County          int64         `bson:"county"`
	Longitude       float64       `bson:"longitude"`
	Latitude        float64       `bson;"latitude"`
	PmsManufacturer string        `bson:"pmsManufacturer"`
	ProjectNum      string        `bson:"projectNum"`
	ContractNo      string        `bson:"contractNo"`
	ContractName    string        `bson:"contractName"`
	EnableUwifi     int64         `bson:"enableUwifi"`
	EnableHms       int64         `bson:"enableHms"`
	Agency          string        `bson:"agency"`
	HotelGrade      string        `bson:"hotelGrade"`
	Sales           string        `bson:"sales"`
	EpgVersion      []string      `bson:"epgVersion"`
	Tags            []string      `bson:"tags"`
	Status          int64         `bson:"status"`
	CreatedAt       int64         `bson:"createdAt"`
	UpdatedAt       int64         `bson:"updatedAt"`
}
