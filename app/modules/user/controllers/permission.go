package controllers

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/user/proxy"

	"github.com/astaxie/beego"
)

type PermissionController struct {
	beego.Controller
}

func (c *PermissionController) List() {
	result := proxy.PermissionProxy.List()
	// fmt.Println("permissions: ", *result)
	data := map[string]interface{}{
		"docs": *result,
	}
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}
