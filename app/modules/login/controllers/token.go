package controllers

import (
	"encoding/json"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
)

type TokenController struct {
	beego.Controller
}

func (c *TokenController) CreateToken() {
	token, expireTime := common.GenToken()
	data := map[string]interface{}{
		"token":      token,
		"expireTime": expireTime,
	}
	c.Data["json"] = common.ResponseJSON(0, "操作成功", data)
	c.ServeJSON()
}

func (c *TokenController) VerifyToken() {
	type requestBody struct {
		Token string `json:token`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	res := common.CheckToken(body.Token)
	data := map[string]interface{}{}
	if res {
		c.Data["json"] = common.ResponseJSON(0, "token验证成功", data)
	} else {
		c.Data["json"] = common.ResponseJSON(-1, "token验证失败", data)
	}
	c.ServeJSON()
}
