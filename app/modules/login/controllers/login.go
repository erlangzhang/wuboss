package controllers

import (
	"encoding/json"
	"fmt"
	"time"
	"work-codes/wushu/app/common"

	"gopkg.in/mgo.v2/bson"

	"github.com/astaxie/beego"

	"work-codes/wushu/app/modules/user/proxy"
)

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Captcha() {

	captchaData, captchaCode := common.Pic()
	fmt.Println("captchaCode: ", captchaCode)

	c.SetSession("captchaCode", captchaCode)
	seCode := c.GetSession("captchaCode")
	fmt.Println("seCode: ", seCode)

	w := c.Ctx.ResponseWriter
	w.Header().Set("Content-Type", "image/png")
	common.NewImage(captchaData, 100, 40).WriteTo(w)
}

func (c *LoginController) Login() {
	type requestBody struct {
		UserName string `json:"userName"`
		UserPwd  string `json:"userPwd"`
		Captcha  string `json:"captcha"`
	}
	var body requestBody
	json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	fmt.Println("body: ", body)

	fmt.Println("code: ", body.Captcha)

	captchaCode := c.GetSession("captchaCode")
	fmt.Println("captchaCode: ", captchaCode)

	data := map[string]interface{}{}

	failedTimes := common.GetFialTimes(body.UserName)
	if failedTimes > 4 {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "多次登陆失败，请五分钟之后再登陆", data)
		c.ServeJSON()
		common.SetExpired(body.UserName)
		return
	}

	if body.Captcha != captchaCode {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "验证码错误", data)
		c.ServeJSON()
		return
	}
	row := proxy.AccountProxy.FindOne(bson.M{"account": body.UserName})
	if row == nil {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "账号不存在", data)
		c.ServeJSON()
		return
	}
	if (*row)["status"] == 0 {
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "账号无效， 请联系管理员解锁", data)
		c.ServeJSON()
	}

	if common.Md5(body.UserPwd) != (*row)["password"] {
		common.AddLoginFailedFlag(body.UserName)
		c.Data["json"] = common.ResJSON(c.Ctx, -1, "密码不正确", data)
		c.ServeJSON()
		return
	}
	//更新登录时间和IP
	updateData := bson.M{"$set": bson.M{"LastLoginTime": time.Now().Unix(), "LastLoginIP": c.Ctx.Input.IP()}}
	_ = proxy.AccountProxy.UpdateId((*row)["_id"].(bson.ObjectId), updateData)

	fmt.Println("登录成功")
	common.ClearExpired(body.UserName)
	data["user"] = *row
	token, expireTime := common.GenToken()
	data["token"] = token
	data["expireTime"] = expireTime

	(*row)["Type"] = (*row)["type"]
	(*row)["AllowActions"] = []string{}
	user := map[string]interface{}{
		"id":   (*row)["_id"],
		"name": (*row)["name"],
	}
	c.SetSession("user", user)
	fmt.Println("user: ", c.GetSession("user"))
	c.Data["json"] = common.ResJSON(c.Ctx, 0, "登录成功", data)
	c.ServeJSON()
}

func (c *LoginController) Logout() {
	data := map[string]interface{}{}
	c.Data["json"] = common.ResponseJSON(0, "退出成功", data)
	c.SetSession("user", nil)
	c.ServeJSON()
}
