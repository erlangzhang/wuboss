package assertions

import (
	"fmt"
	"strings"
	"testing"

	"github.com/smartystreets/gunit"
)

/**************************************************************************/

func TestAssertionsFixture(t *testing.T) {
	gunit.Run(new(AssertionsFixture), t)
}

type AssertionsFixture struct {
	*gunit.Fixture
}

func (this *AssertionsFixture) Setup() {
	serializer = this
}

func (self *AssertionsFixture) serialize(expected, actual interface{}, message string) string {
	return fmt.Sprintf("%v|%v|%s", expected, actual, message)
}

func (self *AssertionsFixture) serializeDetailed(expected, actual interface{}, message string) string {
	return fmt.Sprintf("%v|%v|%s", expected, actual, message)
}

func (this *AssertionsFixture) pass(result string) {
	this.Assert(result == success, result)
}

func (this *AssertionsFixture) fail(actual string, expected string) {
	actual = format(actual)
	expected = format(expected)

	if actual != expected {
		if actual == "" {
			actual = "(empty)"
		}
		this.Errorf("Expected: %s\nActual:   %s\n", expected, actual)
	}
}
func format(message string) string {
	message = strings.Replace(message, "\n", " ", -1)
	for strings.Contains(message, "  ") {
		message = strings.Replace(message, "  ", " ", -1)
	}
	return message
}

/**************************************************************************/

type Thing1 struct {
	a string
}
type Thing2 struct {
	a string
}

type ThingInterface interface {
	Hi()
}

type ThingImplementation struct{}

func (self *ThingImplementation) Hi() {}

type IntAlias int
type StringAlias string
type StringSliceAlias []string
type StringStringMapAlias map[string]string

/**************************************************************************/
