package proxy

func Convert2Log(data map[string]interface{}) *map[string]interface{} {
	row := map[string]interface{}{
		"id":        data["_id"],
		"name":      data["name"],
		"accountId": data["accountId"],
		"url":       data["url"],
		"method":    data["method"],
		"params":    data["params"],
		"code":      data["code"],
		"message":   data["message"],
		"ip":        data["ip"],
		"createdAt": data["createdAt"],
	}
	return &row
}
