#云Boss平台 beego说明

版本:V1.0.0

更新日期:2017-07-25

##1.beego后置路由说明　
```
1.routers/filter.go中
beego.InsertFilter("/app/api/*", beego.AfterExec, AfterExecCallback)
不起作用
　原因：beego源代码已屏蔽了此功能
　修改方法如下：
　　github.com/astaxie/rounter.go　execFilter函数中

    if filterR.returnOnOutput && context.ResponseWriter.Started {
        return true
    }

    修改为：
    if filterR.returnOnOutput && context.ResponseWriter.Started {
        if pos == AfterExec || pos == FinishRouter {
        } else {
            return true
        }
    }

```