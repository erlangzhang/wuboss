package controllers

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"gopkg.in/mgo.v2/bson"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/hotel/proxy"
)

type HotelGroupController struct {
	beego.Controller
}

var hotelGroupProxy = proxy.HotelGroupProxy

func (c *HotelGroupController) List() {
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
		filter["name"] = search
	}
	sort := []string{"-createdAt"}
	result := proxy.HotelGroupProxy.List(filter, page, limit, sort)
	fmt.Println("hotelGroups: ", *result)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", *result)
	c.ServeJSON()
}

func (c *HotelGroupController) Detail() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("id: ", id)
	row := hotelGroupProxy.FindOne(bson.M{"_id": bson.ObjectIdHex(id)})
	fmt.Println("hotelGroup: ", *row)
	data := *row
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *HotelGroupController) Create() {
	// var body map[string]interface{}
	// json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	// fmt.Println("body: ", body["hotelIds"])
	// hotelGroup := &models.HotelGroup{
	// 	Id:   bson.NewObjectId(),
	// 	Name: body["name"].(string),
	// 	// HotelIds: body["hotelIds"].([]string),
	// 	Status: 1,
	// }
	// for _, v := range common.ToSlice(body["hotelIds"]) {
	// 	hotelGroup.HotelIds = append(hotelGroup.HotelIds, v.(string))
	// }
	var body bson.M
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body["hotelIds"])
	body["status"] = 1
	body["createdAt"] = time.Now().Unix()
	body["updatedAt"] = time.Now().Unix()
	err := proxy.HotelGroupProxy.Insert(body)
	fmt.Println("err: ", err)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", body)
	c.ServeJSON()
}

func (c *HotelGroupController) Edit() {
	id := bson.ObjectIdHex(c.Ctx.Input.Param(":id"))
	var body bson.M
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	body["updatedAt"] = time.Now().Unix()
	updateData := bson.M{"$set": body}
	err := hotelGroupProxy.UpdateId(id, updateData)
	data := map[string]interface{}{}
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "编辑失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}

func (c *HotelGroupController) Delete() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("DELETE  id: ", id)
	err := hotelGroupProxy.RemoveId(bson.ObjectIdHex(id))
	fmt.Println("err: ", err)
	data := map[string]interface{}{}
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *HotelGroupController) BatchDelete() {
	type requestBody struct {
		Id []bson.ObjectId `json:"id"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	err := hotelGroupProxy.Remove(bson.M{"_id": bson.M{"$in": body.Id}})
	fmt.Println("err: ", err)
	data := map[string]interface{}{}
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *HotelGroupController) UpdateStatus() {
	type requestBody struct {
		Id     []bson.ObjectId `json:"id"`
		Status int64           `json:"status"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	res, err := hotelGroupProxy.UpdateAll(bson.M{"_id": bson.M{"$in": body.Id}}, bson.M{"$set": bson.M{"status": body.Status}})
	fmt.Println("res: ", res)
	data := map[string]interface{}{}
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "更新失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
