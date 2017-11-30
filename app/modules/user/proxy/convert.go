package proxy

func Convert2Role(data map[string]interface{}) *map[string]interface{} {
	row := map[string]interface{}{
		"id":          data["_id"],
		"name":        data["name"],
		"permissions": data["allow"],
		"status":      data["status"],
		"createdAt":   data["createdAt"],
		"updatedAt":   data["updatedAt"],
	}
	return &row
}

func Convert2Account(data map[string]interface{}) *map[string]interface{} {
	row := map[string]interface{}{
		"id":            data["_id"],
		"account":       data["account"],
		"name":          data["name"],
		"department":    data["department"],
		"telephone":     data["telephone"],
		"lastLoginTime": data["lastLoginTime"],
		"lastLoginIP":   data["lastLoginIP"],
		"roles":         data["roles"],
		"hotelGroups":   data["hotelGroups"],
		"type":          data["type"],
		"status":        data["status"],
		"createdAt":     data["createdAt"],
		"updatedAt":     data["updatedAt"],
	}
	return &row
}
