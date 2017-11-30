package proxy

import (
	"fmt"
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/user/models"

	"gopkg.in/mgo.v2/bson"
)

var AccountProxy *accountProxy

type accountProxy struct {
}

func (proxy *accountProxy) Insert(docs ...interface{}) error {
	err := models.AccountVO.Insert(docs...)
	return err
}

func (proxy *accountProxy) Find(filter bson.M) *[]models.Account {
	var accounts []models.Account
	err := models.AccountVO.Find(filter).All(&accounts)
	if err != nil {
		panic(err)
		return nil
	}
	return &accounts
}

func (proxy *accountProxy) FindOne(filter bson.M) *map[string]interface{} {
	var row map[string]interface{}
	err := models.AccountVO.Find(filter).One(&row)
	if err != nil {
		fmt.Println("account FindOne: ", err)
		return nil
	}
	return &row
}
func (proxy *accountProxy) FindId(id bson.ObjectId) *models.Account {
	var row models.Account
	err := models.AccountVO.FindId(id).One(&row)
	if err != nil {
		panic(err)
		return nil
	}
	return &row
}

func (proxy *accountProxy) RemoveId(id bson.ObjectId) error {
	err := models.AccountVO.RemoveId(id)
	return err
}

func (proxy *accountProxy) Remove(filter bson.M) error {
	err := models.AccountVO.Remove(filter)
	return err
}

func (proxy *accountProxy) UpdateId(id bson.ObjectId, data bson.M) error {
	err := models.AccountVO.UpdateId(id, data)
	return err
}

func (proxy *accountProxy) Update(selector bson.M, update bson.M) error {
	err := models.AccountVO.Update(selector, update)
	return err
}

func (proxy *accountProxy) UpdateAll(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.AccountVO.UpdateAll(selector, data)
	return
}

func (proxy *accountProxy) Upsert(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.AccountVO.Upsert(selector, data)
	return
}

func (proxy *accountProxy) List(filter bson.M, page int, limit int, sort []string) *map[string]interface{} {
	var rows []map[string]interface{}
	skip := (page - 1) * limit
	err := models.AccountVO.Find(filter).Sort(sort...).Skip(skip).Limit(limit).All(&rows)
	if err != nil {
		panic(err)
		return nil
	}
	var docs []map[string]interface{}
	for _, v := range rows {
		docs = append(docs, *Convert2Account(v))
	}
	total, _ := models.AccountVO.Find(filter).Count()
	result := common.PageList(total, page, limit, &docs)
	return result
}
