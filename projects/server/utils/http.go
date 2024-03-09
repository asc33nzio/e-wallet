package util

import (
	"encoding/json"
	"net/http"

	"e-wallet/dtos"
)

func ResponseJSON(w http.ResponseWriter, msg string, data any, statusCode int) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(dto.Response{
		Message: msg,
		Data:    data,
	})
}
