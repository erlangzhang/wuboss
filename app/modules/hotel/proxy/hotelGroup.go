package proxy

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/hotel/models"

	"gopkg.in/mgo.v2/bson"
)

var HotelGroupProxy *hotelGroupProxy

type hotelGroupProxy struct {
}

func NewHotelGroupProxy() *hotelGroupProxy {
	return &hotelGroupProxy{}
}
func (proxy *hotelGroupProxy) Insert(data ...interface{}) error {
	err := models.HotelGroupVO.Insert(data...)
	return err
}
func (proxy *hotelGroupProxy) Find(query bson.M) *[]models.HotelGroup {
	var hotelGroups []models.HotelGroup
	err := models.HotelGroupVO.Find(query).All(&hotelGroups)
	if err != nil {
		panic(err)
		return nil
	}
	return &hotelGroups
}
func (proxy *hotelGroupProxy) FindOne(filter bson.M) *map[string]interface{} {
	var row map[string]interface{}
	err := models.HotelGroupVO.Find(filter).One(&row)
	if err != nil {
		panic(err)
		return nil
	}
	result := Convert2HotelGroup(row)
	return result
}
func (proxy *hotelGroupProxy) RemoveId(id bson.ObjectId) error {
	err := models.HotelGroupVO.RemoveId(id)
	return err
}
func (proxy *hotelGroupProxy) Remove(filter bson.M) error {
	err := models.HotelGroupVO.Remove(filter)
	return err
}
func (proxy *hotelGroupProxy) UpdateId(id bson.ObjectId, data bson.M) error {
	err := models.HotelGroupVO.UpdateId(id, data)
	return err
}
func (proxy *hotelGroupProxy) Update(selector bson.M, update bson.M) error {
	err := models.HotelGroupVO.Update(selector, update)
	return err
}
func (proxy *hotelGroupProxy) UpdateAll(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.HotelGroupVO.UpdateAll(selector, data)
	return
}
func (proxy *hotelGroupProxy) Upsert(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.HotelGroupVO.Upsert(selector, data)
	return
}

func (proxy *hotelGroupProxy) List(filter bson.M, page int, limit int, sort []string) *map[string]interface{} {
	var rows []map[string]interface{}
	skip := (page - 1) * limit
	err := models.HotelGroupVO.Find(filter).Sort(sort...).Skip(skip).Limit(limit).All(&rows)
	if err != nil {
		panic(err)
		return nil
	}
	var docs []map[string]interface{}
	for _, v := range rows {
		var hotelIds []string
		for _, gv := range v["hotelIds"].([]interface{}) {
			hotel := *(HotelProxy.FindOne(bson.M{"_id": bson.ObjectIdHex(gv.(string))}))
			hotelIds = append(hotelIds, hotel["name"].(string))
		}
		v["hotelIds"] = hotelIds
		docs = append(docs, *(Convert2HotelGroup(v)))
	}
	total, _ := models.HotelGroupVO.Find(filter).Count()
	result := common.PageList(total, page, limit, &docs)
	return result
}
