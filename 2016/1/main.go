package main

import (
	"fmt"
	"os"
	"strconv"
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

	instructions := strings.Split(string(dat), ", ")

	return instructions
}

func turnRight(current string) string {
	nextDirections := map[string]string{
		"N": "E",
		"E": "S",
		"S": "W",
		"W": "N",
	}

	return nextDirections[current]
}

func turnLeft(current string) string {
	nextDirections := map[string]string{
		"N": "W",
		"W": "S",
		"S": "E",
		"E": "N",
	}

	return nextDirections[current]
}

func getNewDirection(current string, turnDirection string) string {
	turnMethods := map[string]func(string) string{
		"R": turnRight,
		"L": turnLeft,
	}

	return turnMethods[turnDirection](current)
}

func getNextPosition(
	currentPos [2]int,
	direction string,
	distance int,
	locations map[[2]int]int,
) ([2]int, map[[2]int]int, bool) {

	pos := currentPos
	revisited := false

	for i := 0; i < distance; i += 1 {
		if direction == "N" {
			pos = [2]int{pos[0], pos[1] + 1}
		}
		if direction == "E" {
			pos = [2]int{pos[0] + 1, pos[1]}
		}
		if direction == "S" {
			pos = [2]int{pos[0], pos[1] - 1}
		}
		if direction == "W" {
			pos = [2]int{pos[0] - 1, pos[1]}
		}
		if _, ok := locations[pos]; !ok {
			locations[pos] = 1
		} else {
			revisited = true
			break
		}
	}

	return pos, locations, revisited
}

func parseInstruction(instruction string) (string, int) {
	secondElement, err := strconv.Atoi(instruction[1:])
	check(err)
	return string(instruction[0]), secondElement
}

func absInt(val int) int {
	if val < 0 {
		return -val
	}
	return val
}

func main() {
	instructions := readInput()
	// instructions := []string{"R2", "L3"}
	// instructions := []string{"R5", "L5", "R5", "R3"}
	// instructions := []string{"R2", "L3", "R2", "R2", "R2", "R5", "L5", "R5", "R3"}
	// instructions = []string{"R8", "R4", "R4", "R8"}

	direction := "N"
	pos := [2]int{0, 0}
	locations := map[[2]int]int{pos: 1}
	revisited := false

	for _, instruction := range instructions {
		fmt.Print(direction, "->")
		turn, distance := parseInstruction(instruction)

		direction = getNewDirection(direction, turn)
		fmt.Print(direction, " | (", turn, ")", distance, " | ", pos, "->")
		pos, locations, revisited = getNextPosition(pos, direction, distance, locations)
		if revisited {
			fmt.Println("\n\nVisit twice. Breaking.", pos)
			break
		}
		fmt.Println(pos)
	}

	fmt.Println("final: ", direction, pos)

	distanceAway := absInt(pos[0]) + absInt(pos[1])

	fmt.Println("Distance:", distanceAway)
}
