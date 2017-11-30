package controllers

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"gopkg.in/mgo.v2/bson"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/user/models"
	"work-codes/wushu/app/modules/user/proxy"
)

type AccountController struct {
	beego.Controller
}

func (c *AccountController) List() {
	search := c.GetString("search")
	page, _ := strconv.Atoi(c.Input().Get("page"))
	limit, _ := strconv.Atoi(c.Input().Get("limit"))

	filter := bson.M{}
	if search != "" {
		filter["$or"] = []bson.M{
			bson.M{"name": search},
			bson.M{"account": search},
			bson.M{"department": search},
			bson.M{"telephone": search},
		}
	}
	sort := []string{"-createdAt"}
	result := proxy.AccountProxy.List(filter, page, limit, sort)
	// fmt.Println("users: ", *result)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", *result)
	c.ServeJSON()
}

func (c *AccountController) Detail() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("id: ", id)
	row := proxy.AccountProxy.FindOne(bson.M{"_id": bson.ObjectIdHex(id)})
	data := *(proxy.Convert2Account(*row))
	fmt.Println("account: ", data)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *AccountController) Create() {
	var body *models.Account
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	data := map[string]interface{}{}
	if body == nil {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "参数不能为空", data)
		c.ServeJSON()
		return
	}
	if body.Name == "" {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "角色名不能为空", data)
		c.ServeJSON()
		return
	}
	body.Password = common.Md5(body.Password)
	body.Id = bson.NewObjectId()
	// body.LastLoginTime = time.Now().Unix()
	// body.LastLoginIP = c.Ctx.Input.IP()
	body.Status = 1
	body.CreatedAt = time.Now().Unix()
	body.UpdatedAt = time.Now().Unix()
	err := proxy.AccountProxy.Insert(body)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		row := proxy.AccountProxy.FindOne(bson.M{"_id": body.Id})
		data := *row
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *AccountController) Edit() {
	id := bson.ObjectIdHex(c.Ctx.Input.Param(":id"))
	var body models.Account
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	data := map[string]interface{}{}
	if body.Name == "" {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "姓名不能为空", data)
		c.ServeJSON()
		return
	}
	body.UpdatedAt = time.Now().Unix()
	updateData := bson.M{"$set": bson.M{"account": body.Account, "name": body.Name, "department": body.Department,
		"telephone": body.Telephone, "roles": body.Roles, "hotelGroups": body.HotelGroups}}
	err := proxy.AccountProxy.UpdateId(id, updateData)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "编辑失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *AccountController) UpdateStatus() {
	data := map[string]interface{}{}

	type requestBody struct {
		Id     []bson.ObjectId `json:"id"`
		Status int64           `json:"status"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	if len(body.Id) == 0 {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "参数不能为空", data)
		c.ServeJSON()
		return
	}
	res, err := proxy.AccountProxy.UpdateAll(bson.M{"_id": bson.M{"$in": body.Id}}, bson.M{"$set": bson.M{"status": body.Status}})
	fmt.Println("res: ", res)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "更新失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}

func (c *AccountController) Delete() {
	data := map[string]interface{}{}

	type requestBody struct {
		Id bson.ObjectId `json:"id"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	if body.Id == "" {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "参数不能为空", data)
		c.ServeJSON()
		return
	}
	err := proxy.AccountProxy.Remove(bson.M{"_id": body.Id})
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *AccountController) BatchDelete() {
	data := map[string]interface{}{}

	type requestBody struct {
		Id []bson.ObjectId `json:"id"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	if len(body.Id) == 0 {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "参数不能为空", data)
		c.ServeJSON()
		return
	}
	err := proxy.AccountProxy.Remove(bson.M{"_id": bson.M{"$in": body.Id}})
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *AccountController) UpdatePwd() {
	data := map[string]interface{}{}

	id := bson.ObjectIdHex(c.Ctx.Input.Param(":id"))

	type requestBody struct {
		Password string `bson:"password"`
		NewPwd   string `bson:"newPwd"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("updatePwd: ", body)
	if body.Password == "" {
		fmt.Println("password:", body.Password)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "原密码不能为空", data)
		c.ServeJSON()
		return
	}
	if body.NewPwd == "" {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "新密码不能为空", data)
		c.ServeJSON()
		return
	}
	row := proxy.AccountProxy.FindId(id)
	if common.Md5(body.Password) != (*row).Password {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "原密码不正确", data)
		c.ServeJSON()
		return
	}
	body.NewPwd = common.Md5(body.NewPwd)
	updateData := bson.M{"$set": bson.M{"password": body.NewPwd, "updatedAt": time.Now().Unix()}}
	err := proxy.AccountProxy.UpdateId(id, updateData)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
