package proxy

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/user/models"

	"gopkg.in/mgo.v2/bson"
)

var RoleProxy *roleProxy

type roleProxy struct {
}

func (proxy *roleProxy) Insert(data *models.Role) error {
	err := models.RoleVO.Insert(data)
	return err
}

func (proxy *roleProxy) Find(filter bson.M) *[]models.Role {
	var roles []models.Role
	err := models.RoleVO.Find(filter).All(&roles)
	if err != nil {
		panic(err)
		return nil
	}
	return &roles
}

func (proxy *roleProxy) FindOne(filter bson.M) *map[string]interface{} {
	var row map[string]interface{}
	err := models.RoleVO.Find(filter).One(&row)
	if err != nil {
		panic(err)
		return nil
	}
	result := Convert2Role(row)
	return result
}

func (proxy *roleProxy) RemoveId(id bson.ObjectId) error {
	err := models.RoleVO.RemoveId(id)
	return err
}

func (proxy *roleProxy) Remove(filter bson.M) error {
	err := models.RoleVO.Remove(filter)
	return err
}

func (proxy *roleProxy) UpdateId(id bson.ObjectId, data bson.M) error {
	err := models.RoleVO.UpdateId(id, data)
	return err
}

func (proxy *roleProxy) Update(selector bson.M, update bson.M) error {
	err := models.RoleVO.Update(selector, update)
	return err
}

func (proxy *roleProxy) UpdateAll(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.RoleVO.UpdateAll(selector, data)
	return
}

func (proxy *roleProxy) Upsert(selector bson.M, data bson.M) (info interface{}, err error) {
	info, err = models.RoleVO.Upsert(selector, data)
	return
}

func (proxy *roleProxy) List(filter bson.M, page int, limit int, sort []string) *map[string]interface{} {
	var rows []map[string]interface{}
	skip := (page - 1) * limit
	err := models.RoleVO.Find(filter).Sort(sort...).Skip(skip).Limit(limit).All(&rows)
	if err != nil {
		panic(err)
		return nil
	}
	var docs []map[string]interface{}
	for _, v := range rows {
		docs = append(docs, *Convert2Role(v))
	}
	total, _ := models.RoleVO.Find(filter).Count()
	result := common.PageList(total, page, limit, &docs)
	return result
}
