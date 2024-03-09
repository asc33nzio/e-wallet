package util

import "math/rand"

func RNG() int {
	randomPercentage := rand.Intn(100) + 1
	switch {
	case randomPercentage <= 60:
		return rand.Intn(5) + 1
	case randomPercentage <= 90:
		return rand.Intn(2) + 6
	default:
		return rand.Intn(2) + 8
	}
}
