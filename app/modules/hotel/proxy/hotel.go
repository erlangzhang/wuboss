package proxy

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/hotel/models"

	"gopkg.in/mgo.v2/bson"
)

var HotelProxy *hotelProxy

type hotelProxy struct {
}

func (proxy *hotelProxy) Insert(data ...interface{}) error {
	err := models.HotelVO.Insert(data...)
	if err != nil {
		panic(err)
		return nil
	}
	return err
}

func (proxy *hotelProxy) Find(filter bson.M) *[]models.Hotel {
	var hotels []models.Hotel
	err := models.HotelVO.Find(filter).All(&hotels)
	if err != nil {
		panic(err)
		return nil
	}
	return &hotels
}

func (proxy *hotelProxy) FindOne(filter bson.M) *map[string]interface{} {
	var row map[string]interface{}
	err := models.HotelVO.Find(filter).One(&row)
	if err != nil {
		panic(err)
		return nil
	}
	result := Convert2Hotel(row)
	return result
}

func (proxy *hotelProxy) RemoveId(id bson.ObjectId) error {
	err := models.HotelVO.RemoveId(id)
	return err
}

func (proxy *hotelProxy) Remove(filter bson.M) error {
	err := models.HotelVO.Remove(filter)
	return err
}

func (proxy *hotelProxy) UpdateId(id bson.ObjectId, data bson.M) error {
	err := models.HotelVO.UpdateId(id, data)
	return err
}

func (proxy *hotelProxy) Update(selector bson.M, update bson.M) error {
	err := models.HotelVO.Update(selector, update)
	return err
}

func (proxy *hotelProxy) UpdateAll(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.HotelVO.UpdateAll(selector, data)
	return
}

func (proxy *hotelProxy) Upsert(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.HotelVO.Upsert(selector, data)
	return
}

func (proxy *hotelProxy) List(filter bson.M, page int, limit int, sort []string) *map[string]interface{} {
	var rows []map[string]interface{}
	skip := (page - 1) * limit
	err := models.HotelVO.Find(filter).Sort(sort...).Skip(skip).Limit(limit).All(&rows)
	if err != nil {
		panic(err)
		return nil
	}
	var docs []map[string]interface{}
	for _, v := range rows {
		docs = append(docs, *Convert2Hotel(v))
	}
	total, _ := models.HotelVO.Find(filter).Count()
	result := common.PageList(total, page, limit, &docs)
	return result
}
