package main

import (
	"fmt"
	"os"
	"strings"
)

func check(e error) {
	if e != nil {
		panic((e))
	}
}

func readInput() []string {
	dat, err := os.ReadFile("./input.txt")
	check(err)

	instructions := strings.Split(string(dat), "\n")

	return instructions
}

func getNumpad() [5][5]string {
	return [5][5]string{
		{"", "", "1", "", ""},
		{"", "2", "3", "4", ""},
		{"5", "6", "7", "8", "9"},
		{"", "A", "B", "C", ""},
		{"", "", "D", "", ""},
	}
}

func clampPos(pos *[2]int) {
	if pos[0] > 2 {
		pos[0] = 2
		// fmt.Print("Clamp!")
	} else if pos[0] < 0 {
		pos[0] = 0
		// fmt.Print("Clamp!")
	}

	if pos[1] > 2 {
		pos[1] = 2
		// fmt.Print("Clamp!")
	} else if pos[1] < 0 {
		pos[1] = 0
		// fmt.Print("Clamp!")
	}
}
func moveUp(pos *[2]int)    { pos[1] -= 1 }
func moveDown(pos *[2]int)  { pos[1] += 1 }
func moveRight(pos *[2]int) { pos[0] += 1 }
func moveLeft(pos *[2]int)  { pos[0] -= 1 }

func readNumPad(pos [2]int, numPad [3][3]int) int {
	return numPad[pos[1]][pos[0]]
}

var movements = map[byte]func(*[2]int){
	'U': moveUp,
	'D': moveDown,
	'L': moveLeft,
	'R': moveRight,
}

var numPad = getNumpad()

func main() {
	instructionStrings := readInput()
	pos := [2]int{1, 1}

	fmt.Println(numPad)

	for _, instructionString := range instructionStrings {
		for _, instruction := range instructionString {
			movements[byte(instruction)](&pos)
			clampPos(&pos)
			// fmt.Print(string(instruction), readNumPad(pos, numPad))
		}
		fmt.Println("\n", readNumPad(pos, numPad), pos, numPad)
	}

}
