package controllers

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"gopkg.in/mgo.v2/bson"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/hotel/models"
	"work-codes/wushu/app/modules/hotel/proxy"
)

func convert2DBHotel(data *models.Hotel) {
	data.Longitude, _ = strconv.ParseFloat(strconv.FormatFloat(data.Longitude, 'f', 6, 64), 64)
	data.Latitude, _ = strconv.ParseFloat(strconv.FormatFloat(data.Latitude, 'f', 6, 64), 64)
	// return data;
}

type HotelController struct {
	beego.Controller
}

var hotelProxy = proxy.HotelProxy

func (c *HotelController) List() {
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
	result := proxy.HotelProxy.List(filter, page, limit, sort)
	// fmt.Println("hotels: ", *result)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", *result)
	c.ServeJSON()
}
func (c *HotelController) Detail() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("id: ", id)
	hotel := hotelProxy.FindOne(bson.M{"_id": bson.ObjectIdHex(id)})
	fmt.Println("hotel: ", *hotel)
	data := *hotel
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}
func (c *HotelController) Create() {
	var body bson.M
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	body["status"] = 1
	body["createdAt"] = time.Now().Unix()
	body["UpdatedAt"] = time.Now().Unix()
	err := hotelProxy.Insert(body)
	fmt.Println("err: ", err)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", map[string]interface{}{})
	c.ServeJSON()
}
func (c *HotelController) Edit() {
	id := bson.ObjectIdHex(c.Ctx.Input.Param(":id"))
	var body bson.M
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body["name"])
	body["updatedAt"] = time.Now().Unix()
	updateData := bson.M{"$set": body}
	err := hotelProxy.UpdateId(id, updateData)
	data := map[string]interface{}{}
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "编辑失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *HotelController) Delete() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("DELETE  id: ", id)
	err := hotelProxy.RemoveId(bson.ObjectIdHex(id))
	fmt.Println("err: ", err)
	data := map[string]interface{}{}
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}
func (c *HotelController) BatchDelete() {
	type requestBody struct {
		Id []bson.ObjectId `json:"id"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	err := hotelProxy.Remove(bson.M{"_id": bson.M{"$in": body.Id}})
	// var body map[string]interface{}
	// json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	// fmt.Println("body: ", body["ids"])
	// var hotelIds []bson.ObjectId
	// for _, v := range common.ToSlice(body["ids"]) {
	// 	hotelIds = append(hotelIds, bson.ObjectIdHex(v.(string)))
	// }
	// fmt.Println("hotelIds: ", hotelIds)
	// err := hotelProxy.Remove(bson.M{"_id": bson.M{"$in": hotelIds}})
	fmt.Println("err: ", err)
	data := map[string]interface{}{}
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}
func (c *HotelController) UpdateStatus() {
	type requestBody struct {
		Id     []bson.ObjectId `json:"id"`
		Status int64           `json:"status"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	_, err := hotelProxy.UpdateAll(bson.M{"_id": bson.M{"$in": body.Id}}, bson.M{"$set": bson.M{"status": body.Status}})
	data := map[string]interface{}{}
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "更新失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
