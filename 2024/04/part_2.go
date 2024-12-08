package main

import (
	"fmt"
	"os"
	"strings"
)

func ReadFile(path string) (string, error) {
	contents, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}
	return string(contents), nil
}

func FormatContents(contents string) []string {
	lines := strings.Split(contents, "\n")
	return lines
}

var directions = [][]int{
	[]int{-1,-1}, // UpLeft
	[]int{-1,1}, 	// UpRight
	[]int{1,-1}, 	// DownLeft
	[]int{1,1},  	// DownRight
}

func SearchPositionForXMAS(lines []string, start []int) bool {
	x, y := start[0], start[1]
	if string(lines[x][y]) != "A" {
		return false
	}
	if x == 0 || y == 0 || x == len(lines) - 1 || y == len(lines[0]) - 1 {
		return false
	}
	upLeft := string(lines[x-1][y-1])
	upRight := string(lines[x-1][y+1])
	downLeft := string(lines[x+1][y-1])
	downRight := string(lines[x+1][y+1])
	fmt.Println(upLeft, upRight, downLeft, downRight)

	if upLeft == downRight || upRight == downLeft {
		fmt.Println("Same on Diagonal")
		return false
	}

	if (upLeft != "M" && upLeft != "S") || (upRight != "M" && upRight != "S") || (downLeft != "M" && downLeft != "S") || (downRight != "M" && downRight != "S") {
		fmt.Println("Not M or S")
		return false
	}

	return true

}

func Search(lines []string) []string {
	var results []string
	for i, line := range lines {
		for j, _ := range line {
			if SearchPositionForXMAS(lines, []int{i, j}) {
				results = append(results, fmt.Sprintf("Found at (%d, %d)", i, j))
			}
		}
	}
	return results
}

func main() {
	contents, err := ReadFile("input.txt")

	if err != nil {
		fmt.Println(err)
		return
	}
	
	lines := FormatContents(contents)
	results := Search(lines)
	fmt.Println(results)
	fmt.Println(len(results))
}