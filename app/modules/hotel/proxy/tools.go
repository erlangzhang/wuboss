package proxy

import (
	"github.com/goless/config"

	hotelConfig "work-codes/wushu/app/modules/hotel/config"
)

var ToolsProxy *toolsProxy

type toolsProxy struct{}

var (
	provinceJSON = config.New("conf/data/province.json")
	cityJSON     = config.New("conf/data/city.json")
	areaJSON     = config.New("conf/data/area.json")
)

func (proxy *toolsProxy) Areas() *map[string]interface{} {
	result := map[string]interface{}{
		"province": provinceJSON.Get("provinces").(interface{}),
		"city":     cityJSON.Get("citys").(interface{}),
		"county":   areaJSON.Get("areas").(interface{}),
	}
	return &result
}

func (proxy *toolsProxy) DataSource() *map[string]interface{} {
	result := map[string]interface{}{
		"agencys":     hotelConfig.Agencys,
		"stars":       hotelConfig.Stars,
		"epgs":        hotelConfig.Epgs,
		"hotelGrades": hotelConfig.HotelGrades,
		"ctripStars":  hotelConfig.CtripStars,
	}
	return &result
}
