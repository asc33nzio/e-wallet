package logger

import (
	"log"
	"os"
	"runtime/debug"
	"strings"
	"sync"
)

var (
	infoLogger  *log.Logger
	errorLogger *log.Logger
	once        sync.Once
)

func Init() {
	once.Do(func() {
		infoFile, err := os.OpenFile("info.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			log.Fatalf("error opening info file: %v", err)
		}

		errorFile, err := os.OpenFile("error.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			log.Fatalf("error opening error file: %v", err)
		}

		infoLogger = log.New(infoFile, "[INFO] ", log.LstdFlags)
		errorLogger = log.New(errorFile, "[ERROR] ", log.LstdFlags)
	})
}

func ExtractStackTrace() string {
	stackTrace := debug.Stack()
	lines := strings.Split(string(stackTrace), "\n")

	var relevantLines []string
	startIndex := -1
	endIndex := -1

	for i, line := range lines {
		if strings.Contains(line, "/repositories/") ||
			strings.Contains(line, "/services/") ||
			strings.Contains(line, "/controllers/") {
			if startIndex == -1 {
				startIndex = i
			}
			endIndex = i
		}
	}

	if startIndex != -1 && endIndex != -1 {
		relevantLines = lines[startIndex : endIndex+1]
	}

	return strings.Join(relevantLines, "\n")
}

func Info(message string) {
	infoLogger.Println(message)
}

func Error(message string) {
	stackTrace := ExtractStackTrace()
	errorMessage := message + stackTrace
	errorLogger.Println(errorMessage)
}
