package proxy

import (
	"work-codes/wushu/app/modules/demo/models"

	"gopkg.in/mgo.v2/bson"
)

var DemoProxy *demoProxy

type demoProxy struct {
}

func (proxy *demoProxy) Insert(data *models.Demo) error {
	err := models.DemoVO.Insert(data)
	return err
}

func (proxy *demoProxy) Remove(filter bson.M) error {
	err := models.DemoVO.Remove(filter)
	return err
}
