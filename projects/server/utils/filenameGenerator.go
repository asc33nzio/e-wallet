package util

import (
	"math/rand"
	"strconv"
	"time"
)

func GenerateRandomFilename(prefix string, extension string) string {
	randomNumber := rand.Intn(1000000000000)
	randomNumberStr := strconv.Itoa(randomNumber)
	filename := prefix + time.Now().Format("20060102") + randomNumberStr + extension

	return filename
}
