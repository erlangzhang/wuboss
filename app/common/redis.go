package common

import (
	"github.com/garyburd/redigo/redis"
)

var (
	RedisSession redis.Conn
)

func init() {
	RedisSession, _ = redis.Dial("tcp", ":6379")
}

func GetFialTimes(val string) int {
	exists, _ := redis.Bool(RedisSession.Do("EXISTS", val))
	if exists {
		n, _ := redis.Int(RedisSession.Do("GET", val))
		return n
	} else {
		return 0
	}
}

func AddLoginFailedFlag(val string) int {
	num, _ := redis.Int(RedisSession.Do("INCR", val))
	RedisSession.Do("EXPIRE", key, 300)
	return num
}

func ClearExpired(key string) {
	RedisSession.Do("EXPIRE", key, 3)
}

func SetExpired(key string) {
	RedisSession.Do("EXPIRE", key, 300)
}

func RedisClose() {
	RedisSession.Close()
}
