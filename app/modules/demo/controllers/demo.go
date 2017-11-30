package controllers

import (
	"encoding/json"
	"fmt"

	"gopkg.in/mgo.v2/bson"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/demo/models"
	"work-codes/wushu/app/modules/demo/proxy"
)

type DemoController struct {
	beego.Controller
}

func (c *DemoController) DemoGet() {
	id := c.Ctx.Input.Param(":id")
	data := map[string]interface{}{
		"id": id,
	}
	c.Data["json"] = common.ResponseJSON(0, "操作成功", data)
	c.ServeJSON()
}

func (c *DemoController) DemoQuery() {
	// name := c.GetString("name")
	name := c.Ctx.Input.Query("name")
	fmt.Println("name: ", name)
	data := map[string]interface{}{
		"name": name,
	}
	c.Data["json"] = common.ResponseJSON(0, "操作成功", data)
	c.ServeJSON()
}

func (c *DemoController) DemoFrom() {
	name := c.Ctx.Input.Query("name")
	fmt.Println("name: ", name)
	citys := c.Ctx.Input.Query("citys")
	fmt.Println("citys: ", citys)
	data := map[string]interface{}{
		"name":  name,
		"citys": citys,
	}
	c.Data["json"] = common.ResponseJSON(0, "操作成功", data)
	c.ServeJSON()
}

func (c *DemoController) DemoJson() {
	var body map[string]interface{}
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body["name"])
	fmt.Println("citys: ", body["citys"])
	if body["name"] == "ztime" {
		fmt.Println("json sucess")
	}
	demo := &models.Demo{
		Id:   bson.NewObjectId(),
		Name: body["name"].(string),
		Pwd:  body["pwd"].(string),
	}
	demoProxy := proxy.DemoProxy
	err := demoProxy.Insert(demo)
	fmt.Println("err: ", err)
	c.Data["json"] = common.ResponseJSON(0, "操作成功", body)
	c.ServeJSON()
}
func (c *DemoController) Captcha() {
	data := map[string]interface{}{
		"verifyCode": 123,
	}
	c.Data["json"] = common.ResponseJSON(0, "操作成功", data)
	c.ServeJSON()
}

func (c *DemoController) Login() {
	userName := c.GetString("UserName")
	passWord := c.GetString("PassWord")
	verifyCode := c.GetString("verifyCode")

	fmt.Println("code: ", verifyCode)

	res := map[string]interface{}{
		"code": 0,
		"msg":  "",
		"data": map[string]interface{}{},
	}

	if verifyCode != "123" {
		res["msg"] = "验证码错误"
		c.Data["json"] = res
		c.ServeJSON()
	}

	if userName == "ztime" && passWord == "12345" {
		res["msg"] = "登录成功"
	} else {
		res["msg"] = "登录失败"
	}
	c.Data["json"] = res
	c.ServeJSON()
}

func (c *DemoController) Logout() {
	res := map[string]interface{}{
		"code": 0,
		"msg":  "退出成功",
		"data": map[string]interface{}{
			"code": "123",
		},
	}
	c.Data["json"] = res
	c.ServeJSON()
}
