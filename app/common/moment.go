package common

import "time"

const (
	TimeFormat = "2006-01-02 15:04:05"
)

type Moment struct{}

func (m *Moment) Format(unix int64) string {
	return time.Unix(unix, 0).Format(TimeFormat)
}
