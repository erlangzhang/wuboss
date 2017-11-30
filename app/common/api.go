package common

import (
	"fmt"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

func writerLog(ctx *context.Context, code int64, message string) {
	if ctx.Input.IsGet() {
		return
	}
	fmt.Println("status: ", ctx.ResponseWriter.Status)
	fmt.Println("message: ", ctx.ResponseWriter)
	user, ok := ctx.Input.Session("user").(map[string]interface{})
	if ok && len(user) > 0 {
		doc := map[string]interface{}{
			"accountId": user["id"],
			"name":      user["name"],
			"url":       ctx.Input.URI(),
			"method":    ctx.Input.Method(),
			"params":    ctx.Input.Params(),
			"code":      ctx.ResponseWriter.Status,
			"message":   message,
			"ip":        ctx.Input.IP(),
			"createdAt": time.Now().Unix(),
		}
		_ = LogVO.Insert(doc)
	}
}

type Result struct {
	Code int64       `json:"code"`
	Msg  string      `json:"message"`
	Data interface{} `json:"data"`
}

func ResponseJSON(code int64, msg string, data map[string]interface{}) *Result {
	return &Result{
		Code: code,
		Msg:  msg,
		Data: data,
	}
}

func ResJSON(ctx *context.Context, code int64, msg string, data map[string]interface{}) *Result {
	fmt.Println("IP: ", ctx.Input.IP())
	writerLog(ctx, code, msg)
	if code == -1 {
		ctx.Output.SetStatus(500)
	}
	return &Result{
		Code: code,
		Msg:  msg,
		Data: data,
	}
}

type API struct {
	beego.Controller
}

func (api *API) JSON(code int64, msg string, data interface{}) {
	res := &Result{
		Code: code,
		Msg:  msg,
		Data: data,
	}
	api.Data["json"] = res
	api.ServeJSON()
	return
}
