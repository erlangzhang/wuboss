package routers

import (
	"net/http"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"

	demo "work-codes/wushu/app/modules/demo/controllers"
	hotel "work-codes/wushu/app/modules/hotel/controllers"
	log "work-codes/wushu/app/modules/log/controllers"
	login "work-codes/wushu/app/modules/login/controllers"
	user "work-codes/wushu/app/modules/user/controllers"
)

func init() {

	// demo
	beego.Router("/wushu/api/demo/captcha", &demo.DemoController{}, "get:Captcha")
	beego.Router("/wushu/api/demo/login", &demo.DemoController{}, "post:Login")
	beego.Router("/wushu/api/demo/logout", &demo.DemoController{}, "post:Logout")
	beego.Router("/wushu/api/demo/demoget/:id", &demo.DemoController{}, "get:DemoGet")
	beego.Router("/wushu/api/demo/demoquery", &demo.DemoController{}, "get:DemoQuery")
	beego.Router("/wushu/api/demo/demofrom", &demo.DemoController{}, "post:DemoFrom")
	beego.Router("/wushu/api/demo/demojson", &demo.DemoController{}, "post:DemoJson")

	// login
	// beego.Handler("/wushu/api/captcha/*.png", captcha.Server(240, 80))
	beego.Router("/wushu/api/login/captcha", &login.LoginController{}, "get:Captcha")
	beego.Router("/wushu/api/login", &login.LoginController{}, "post:Login")
	beego.Router("/wushu/api/logout", &login.LoginController{}, "post:Logout")
	beego.Router("/wushu/api/login/token", &login.TokenController{}, "get:CreateToken")
	beego.Router("/wushu/api/login/verifyToken", &login.TokenController{}, "post:VerifyToken")

	//user
	beego.Router("/wushu/api/roles/batchDelete", &user.RoleController{}, "post:BatchDelete")
	beego.Router("/wushu/api/roles", &user.RoleController{}, "get:List")
	beego.Router("/wushu/api/roles", &user.RoleController{}, "post:Create")
	beego.Router("/wushu/api/roles/:id", &user.RoleController{}, "post:Edit")
	beego.Router("/wushu/api/roles/:id", &user.RoleController{}, "get:Detail")
	beego.Router("/wushu/api/roles/:id", &user.RoleController{}, "delete:Delete")
	beego.Router("/wushu/api/roleStatus", &user.RoleController{}, "post:UpdateStatus")

	//account
	beego.Router("/wushu/api/accounts/batchDelete", &user.AccountController{}, "post:BatchDelete")
	beego.Router("/wushu/api/accounts/:id/password", &user.AccountController{}, "post:UpdatePwd")
	beego.Router("/wushu/api/accounts", &user.AccountController{}, "get:List")
	beego.Router("/wushu/api/accounts/:id", &user.AccountController{}, "get:Detail")
	beego.Router("/wushu/api/accounts", &user.AccountController{}, "post:Create")
	beego.Router("/wushu/api/accounts/:id", &user.AccountController{}, "post:Edit")
	beego.Router("/wushu/api/accounts/:id", &user.AccountController{}, "delete:Delete")
	beego.Router("/wushu/api/accountStatus", &user.AccountController{}, "post:UpdateStatus")
	beego.Router("/wushu/api/permissions", &user.PermissionController{}, "get:List")

	// hotel
	beego.Router("/wushu/api/hotel/hotels/batchDelete", &hotel.HotelController{}, "post:BatchDelete")
	beego.Router("/wushu/api/hotels", &hotel.HotelController{}, "post:Create")
	beego.Router("/wushu/api/hotels", &hotel.HotelController{}, "get:List")
	beego.Router("/wushu/api/hotels/:id", &hotel.HotelController{}, "post:Edit")
	beego.Router("/wushu/api/hotels/:id", &hotel.HotelController{}, "get:Detail")
	beego.Router("/wushu/api/hotels/:id", &hotel.HotelController{}, "delete:Delete")
	beego.Router("/wushu/api/hotelStatus", &hotel.HotelController{}, "post:UpdateStatus")

	beego.Router("/wushu/api/areas", &hotel.ToolsController{}, "get:Areas")
	beego.Router("/wushu/api/hotel/dataSource", &hotel.ToolsController{}, "get:DataSource")

	// hotelgroup
	beego.Router("/wushu/api/hotel/groups/batchDelete", &hotel.HotelGroupController{}, "post:BatchDelete")
	beego.Router("/wushu/api/hotel/groups", &hotel.HotelGroupController{}, "post:Create")
	beego.Router("/wushu/api/hotel/groups", &hotel.HotelGroupController{}, "get:List")
	beego.Router("/wushu/api/hotel/groups/:id", &hotel.HotelGroupController{}, "post:Edit")
	beego.Router("/wushu/api/hotel/groups/:id", &hotel.HotelGroupController{}, "get:Detail")
	beego.Router("/wushu/api/hotel/groups/:id", &hotel.HotelGroupController{}, "delete:Delete")
	beego.Router("/wushu/api/hotel/groupStatus", &hotel.HotelGroupController{}, "post:UpdateStatus")

	//log
	beego.Router("/wushu/api/logs", &log.LogController{}, "get:List")

	beego.Get("/*", func(ctx *context.Context) {
		http.ServeFile(ctx.ResponseWriter, ctx.Request, "public/")
	})
}
