package controllers

import (
	"work-codes/wushu/app/common"
	"work-codes/wushu/app/modules/hotel/proxy"

	"github.com/astaxie/beego"
)

type ToolsController struct {
	beego.Controller
}

func (c *ToolsController) Areas() {
	result := proxy.ToolsProxy.Areas()
	data := *result
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}

func (c *ToolsController) DataSource() {
	result := proxy.ToolsProxy.DataSource()
	data := *result
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "操作成功", data)
	c.ServeJSON()
}
