package models

import (
	"fmt"
	"log"
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"
)

var UserVO = common.DB("wushu").C("user")

type User struct {
	Id   bson.ObjectId `bson:"_id"`
	Name string        `bson:"name"`
	Pwd  string        `bson:"pwd"`
}

func AddUser(userName, userPassword string) {
	err := UserVO.Insert(&User{
		Id:   bson.NewObjectId(),
		Name: userName,
		Pwd:  encryptPass(userPassword)})

	if err != nil {
		log.Fatal(err)
	}

	result := User{}
	err = UserVO.Find(bson.M{"name": userName}).One(&result)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("password:", result.Pwd)
}

func CheckUser(name, password string) bool {
	res := User{}
	err := UserVO.Find(bson.M{"name": name}).One(&res)
	if err != nil {
		return false
	}

	fmt.Println("In checkUser password:", res.Pwd)
	return res.Pwd == encryptPass(password)
}

func encryptPass(old string) string {
	return common.Md5(old)
}
