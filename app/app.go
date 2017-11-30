package main

import (
	"github.com/astaxie/beego"

	"work-codes/wushu/app/common"
	_ "work-codes/wushu/app/routers"
)

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.SetStaticPath("/static", "public")
	beego.SetStaticPath("/wushu/public", "public")

	beego.Run()

	defer common.MgoClose()
	defer common.RedisClose()
}
