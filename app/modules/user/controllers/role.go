package controllers

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/astaxie/beego"
	"gopkg.in/mgo.v2/bson"

	"work-codes/wushu/app/common"

	"work-codes/wushu/app/modules/user/models"
	"work-codes/wushu/app/modules/user/proxy"
)

type RoleController struct {
	beego.Controller
}

func (c *RoleController) List() {
	search := c.GetString("search")
	// permissions := c.GetString("permissions")
	page, err := strconv.Atoi(c.Input().Get("page"))
	if err != nil {
		page = 1
	}
	limit, err := strconv.Atoi(c.Input().Get("limit"))
	if err != nil {
		limit = 9999
	}

	filter := bson.M{}
	if search != "" {
		filter["name"] = search
	}
	// if len(permissions) != 0 {
	// 	filter["permissions"] = bson.M{"$in": permissions}
	// }
	sort := []string{"-createdAt"}
	result := proxy.RoleProxy.List(filter, page, limit, sort)
	// fmt.Println("roles: ", *result)
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", *result)
	c.ServeJSON()
}

func (c *RoleController) Detail() {
	id := c.Ctx.Input.Param(":id")
	fmt.Println("id: ", id)
	role := proxy.RoleProxy.FindOne(bson.M{"_id": bson.ObjectIdHex(id)})
	fmt.Println("role: ", *role)
	data := *role
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *RoleController) Create() {
	var body *models.Role
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	for _, v := range body.Permissions {
		permission := proxy.PermissionProxy.Get(v)
		body.Allow = append(body.Allow, *permission)
	}
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
	body.Id = bson.NewObjectId()
	body.Status = 1
	body.CreatedAt = time.Now().Unix()
	body.UpdatedAt = time.Now().Unix()
	err := proxy.RoleProxy.Insert(body)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		role := proxy.RoleProxy.FindOne(bson.M{"_id": body.Id})
		data := *role
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *RoleController) Edit() {
	id := bson.ObjectIdHex(c.Ctx.Input.Param(":id"))
	var body models.Role
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	data := map[string]interface{}{}
	if body.Name == "" {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "角色名不能为空", data)
		c.ServeJSON()
		return
	}
	for _, v := range body.Permissions {
		permission := proxy.PermissionProxy.Get(v)
		body.Allow = append(body.Allow, *permission)
	}
	body.UpdatedAt = time.Now().Unix()
	updateData := bson.M{"$set": bson.M{"name": body.Name, "permissions": body.Permissions, "allow": body.Allow}}
	err := proxy.RoleProxy.UpdateId(id, updateData)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "编辑失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
func (c *RoleController) UpdateStatus() {
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
	res, err := proxy.RoleProxy.UpdateAll(bson.M{"_id": bson.M{"$in": body.Id}}, bson.M{"$set": bson.M{"status": body.Status}})
	fmt.Println("res: ", res)
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "更新失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}

func (c *RoleController) Delete() {
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
	err := proxy.RoleProxy.Remove(bson.M{"_id": bson.M{"$in": body.Id}})
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}

func (c *RoleController) BatchDelete() {
	type requestBody struct {
		Id []bson.ObjectId `json:"id"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)
	err := proxy.RoleProxy.Remove(bson.M{"_id": bson.M{"$in": body.Id}})
	data := map[string]interface{}{}
	if err != nil {
		fmt.Println("err: ", err)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "操作失败", data)
	} else {
		c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	}
	c.ServeJSON()
}
