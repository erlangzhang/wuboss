package proxy

func Convert2Hotel(data map[string]interface{}) *map[string]interface{} {
	row := map[string]interface{}{
		"id":              data["_id"],
		"name":            data["name"],
		"hostId":          data["hostId"],
		"hotelType":       data["hotelType"],
		"stars":           data["start"],
		"ctripStars":      data["ctripStars"],
		"contactName":     data["contactName"],
		"phoneNumber":     data["phoneNumber"],
		"roomsCount":      data["roomsCount"],
		"detailAddress":   data["detailAddress"],
		"description":     data["description"],
		"province":        data["province"],
		"city":            data["city"],
		"county":          data["county"],
		"longitude":       data["logitude"],
		"latitude":        data["latitude"],
		"pmsManufacturer": data["pmsManufacturer"],
		"projectNum":      data["projectNum"],
		"contractNo":      data["contractNo"],
		"contractName":    data["contractName"],
		"enableUwifi":     data["enableUwifi"],
		"enableHms":       data["enableHms"],
		"agency":          data["agency"],
		"hotelGrade":      data["hotelGrade"],
		"sales":           data["sales"],
		"epgVersion":      data["epgVersion"],
		"tags":            data["tags"],
		"status":          data["status"],
		"createdAt":       data["createdAt"],
		"updatedAt":       data["updatedAt"],
	}
	return &row
}

func Convert2HotelGroup(data map[string]interface{}) *map[string]interface{} {
	row := map[string]interface{}{
		"id":        data["_id"],
		"name":      data["name"],
		"hotelIds":  data["hotelIds"],
		"status":    data["status"],
		"createdAt": data["createdAt"],
		"updatedAt": data["updatedAt"],
	}
	return &row
}
