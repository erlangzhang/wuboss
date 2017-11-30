package main

import (
	"fmt"
	"time"

	"github.com/astaxie/beego"
	"gopkg.in/mgo.v2/bson"

	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/user/proxy"
)

func init() {
	// 初始化管理员账号 demo,  demo
	if beego.BConfig.RunMode == "dev" {
		doc := bson.M{
			"account":       "demo",
			"name":          "demo",
			"password":      common.Md5("demo"),
			"type":          9999,
			"department":    "",
			"telephone":     "",
			"lastLoginTime": time.Now().Unix(),
			"lastLoginIP":   "127.0.0.1",
			"roles":         []map[string]string{},
			"hotelGroups":   []map[string]string{},
			"status":        1,
			"createdAt":     time.Now().Unix(),
			"updatedAt":     time.Now().Unix(),
		}
		_, err := proxy.AccountProxy.Upsert(bson.M{"account": "demo"}, bson.M{"$set": doc})
		if err != nil {
			fmt.Println("initDB error: ", err)
		}
		// row := proxy.AccountProxy.FindOne(bson.M{"account": "demo"})
		// if row == nil {
		// 	fmt.Println("doc: ", doc)
		// 	err := proxy.AccountProxy.Insert(doc)
		// 	fmt.Println("insert result: ", err)
		// }
	}
}
