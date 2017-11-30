package routers

import (
	"fmt"
	"net/http"
	"strings"
	"work-codes/wushu/app/common"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

var noAuthPaths = []string{
	// "/",
	// "/#",
	"wushu/api/login",
	"wushu/api/logout",
	"wushu/api/login/captcha",
}

func BaseURL(ctx *context.Context) string {
	var baseUrl string = ctx.Input.Site() + fmt.Sprintf(":%d", ctx.Input.Port())
	if ctx.Input.Header("X-Forwarded-Host") != "" {
		baseUrl = ctx.Input.Scheme() + "://" + ctx.Input.Header("X-Forwarded-Host")
	}
	return baseUrl
}

var AuthFilter = func(ctx *context.Context) {
	for _, v := range noAuthPaths {
		if strings.Index(ctx.Request.URL.Path, v) >= 0 {
			return
		}
	}
	authString := ctx.Input.Header("authorization")
	// authString := "aaaaa"
	fmt.Println("AuthString:", authString)

	authRes := common.CheckToken(authString)
	fmt.Println("authRes: ", authRes)
	if !authRes {
		ctx.Redirect(302, "/")
	}
}

var TransparentStatic = func(ctx *context.Context) {
	if strings.Index(ctx.Request.URL.Path, "wushu/api") >= 0 {
		return
	}
	http.ServeFile(ctx.ResponseWriter, ctx.Request, "public/")
}

var FilterUserSession = func(c *context.Context) {
	for _, v := range noAuthPaths {
		if strings.Index(c.Request.URL.Path, v) >= 0 {
			return
		}
	}
	user, ok := c.Input.Session("user").(map[string]interface{})
	fmt.Println("userSession: ", user)
	if !ok {
		c.Redirect(302, "/")
	}
	if len(user) == 0 || user["id"] == "" {
		c.Redirect(302, "/")
	}
}

var AfterExecCallback = func(c *context.Context) {
	fmt.Println("AfterExecCallback.....")
}

func init() {
	beego.InsertFilter("/", beego.BeforeRouter, TransparentStatic)
	beego.InsertFilter("/*", beego.BeforeRouter, TransparentStatic)

	beego.InsertFilter("/wushu/api/*", beego.BeforeRouter, AuthFilter)
	beego.InsertFilter("/wushu/api/*", beego.BeforeRouter, FilterUserSession)
	beego.InsertFilter("/wushu/api/*", beego.AfterExec, AfterExecCallback)
}
