package proxy

import (
	"github.com/goless/config"
)

var PermissionProxy *permissionProxy

type permissionProxy struct{}

var permissions = config.New("conf/data/permissions.json")

func (proxy *permissionProxy) List() *[]interface{} {
	rows := permissions.Get("permissions").([]interface{})
	return &rows
}

func (proxy *permissionProxy) Get(id string) *map[string]interface{} {
	var result map[string]interface{}
	rows := permissions.Get("permissions").([]interface{})
	for _, v := range rows {
		tmp := v.(map[string]interface{})
		if tmp["id"] == id {
			result = tmp
		}
	}
	return &result
}
