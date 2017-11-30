# mgo操作
## 示例:
````
package main

import (
    "log"
    "fmt"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

type Person struct {
        Name string
        Phone string
}

func main() {
        session, err := mgo.Dial("server1.example.com,server2.example.com")
        if err != nil {
                panic(err)
        }
        defer session.Close()

        // Optional. Switch the session to a monotonic behavior.
        session.SetMode(mgo.Monotonic, true)

        c := session.DB("test").C("people")
        err = c.Insert(&Person{"Ale", "+55 53 8116 9639"},
	               &Person{"Cla", "+55 53 8402 8510"})
        if err != nil {
                log.Fatal(err)
        }

        result := Person{}
        err = c.Find(bson.M{"name": "Ale"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }

        fmt.Println("Phone:", result.Phone)
}
````

# mgo测试

````
$ go get gopkg.in/check.v1
$ make startdb
$ go test -gocheck.v
$ make stopdb
````

# boson测试

````
这是一个简单的demo, Preson结构体，Phone在初始化时没有被包含。因为phone的TAG设置为(",omitempty"),并且phone的初始时为0
````
````
package main

import (
        "fmt"
	"gopkg.in/mgo.v2/bson"
)

type Person struct {
    Name string
    Phone string ",omitempty"
}

func main() {
        data, err := bson.Marshal(&Person{Name:"Bob"})
        if err != nil {
                panic(err)
        }
        fmt.Printf("%q", data)
}
````

# 简单测试方法
 ## 示例如下：
````
package hello_test

import (
    "testing"
    "io"

    . "gopkg.in/check.v1"
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type MySuite struct{}

var _ = Suite(&MySuite{})

func (s *MySuite) TestHelloWorld(c *C) {
    c.Assert(42, Equals, "42")
    c.Assert(io.ErrClosedPipe, ErrorMatches, "io: .*on closed pipe")
    c.Check(42, Equals, 42)
}
````
# 测试参考代码
````
 ## vendor\gopkg.in\mgo.v2\suite_test.go
 ## vendor\gopkg.in\mgo.v2\boson\bson_test.go
````