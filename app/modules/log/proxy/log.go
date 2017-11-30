package proxy

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/log/models"

	"gopkg.in/mgo.v2/bson"
)

var LogProxy *logProxy

type logProxy struct{}

func (proxy *logProxy) Insert(docs ...interface{}) error {
	err := models.LogVO.Insert(docs...)
	return err
}

func (proxy *logProxy) Find(filter bson.M) *[]models.Log {
	var logs []models.Log
	err := models.LogVO.Find(filter).All(&logs)
	if err != nil {
		panic(err)
		return nil
	}
	return &logs
}

func (proxy *logProxy) List(filter bson.M, page int, limit int, sort []string) *map[string]interface{} {
	var rows []map[string]interface{}
	skip := (page - 1) * limit
	err := models.LogVO.Find(filter).Sort(sort...).Skip(skip).Limit(limit).All(&rows)
	if err != nil {
		panic(err)
		return nil
	}
	var docs []map[string]interface{}
	for _, v := range rows {
		docs = append(docs, *Convert2Log(v))
	}
	total, _ := models.LogVO.Find(filter).Count()
	result := common.PageList(total, page, limit, &docs)
	return result
}
