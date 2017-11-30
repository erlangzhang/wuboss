package controllers

import (
	"strconv"

	"github.com/astaxie/beego"
	"gopkg.in/mgo.v2/bson"

	"work-codes/wushu/app/common"

	"work-codes/wushu/app/modules/log/proxy"
)

type LogController struct {
	beego.Controller
}

func (c *LogController) List() {
	search := c.GetString("search")
	page, err := strconv.Atoi(c.Input().Get("page"))
	if err != nil {
		page = 1
	}
	limit, err := strconv.Atoi(c.Input().Get("limit"))
	if err != nil {
		limit = 15
	}
	filter := bson.M{}
	if search != "" {
		filter["$or"] = []bson.M{
			bson.M{"name": search},
			bson.M{"accountId": search},
			bson.M{"url": search},
		}
	}
	sort := []string{"-createdAt"}
	result := proxy.LogProxy.List(filter, page, limit, sort)
	// fmt.Println("logs: ", *result)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", *result)
	c.ServeJSON()
}
