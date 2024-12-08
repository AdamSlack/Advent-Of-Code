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
	[]int{-1,0}, 	// Up
	[]int{1,0}, 	// Down
	[]int{0,-1}, 	// Left
	[]int{0,1}, 	// Right
	[]int{-1,-1}, // UpLeft
	[]int{-1,1}, 	// UpRight
	[]int{1,-1}, 	// DownLeft
	[]int{1,1},  	// DownRight
}

func SearchPosition(lines []string, keyword string, start []int, direction []int) bool {
	x, y := start[0], start[1]
	dx, dy := direction[0], direction[1]
	for _, char := range keyword {
		if x < 0 || y < 0 || x >= len(lines) || y >= len(lines[0]) {
			return false
		}
		if string(lines[x][y]) != string(char) {
			return false
		}
		x += dx
		y += dy
	}
	return true
}

func Search(lines []string, keyword string) []string {
	var results []string
	for i, line := range lines {
		for j, _ := range line {
			for _, direction := range directions {
				if SearchPosition(lines, keyword, []int{i, j}, direction) {
					results = append(results, fmt.Sprintf("Found at (%d, %d)", i, j))
				}
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
	results := Search(lines, "XMAS")
	fmt.Println(results)
	fmt.Println(len(results))
}