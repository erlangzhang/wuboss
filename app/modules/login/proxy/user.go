package proxy

import (
	"work-codes/wushu/app/modules/login/models"

	"gopkg.in/mgo.v2/bson"
)

var UserProxy *userProxy

type userProxy struct{}

func (proxy *userProxy) Insert(data *models.User) error {
	err := models.UserVO.Insert(data)
	return err
}

func (proxy *userProxy) Remove(filter bson.M) error {
	err := models.UserVO.Remove(filter)
	return err
}
