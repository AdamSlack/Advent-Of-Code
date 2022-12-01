"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readInput = (fileName) => {
    const fp = (0, path_1.join)(__dirname, 'inputs', `${fileName}.txt`);
    return (0, fs_1.readFileSync)(fp, 'utf-8');
};
const input = readInput('part_1').split('\n\n').filter((line) => !!line).map((line) => line.split('\n').map((calories) => parseInt(calories, 10), 0));
console.log(input);
const elfCaloriesSums = input.map((elfCalories) => elfCalories.reduce((acc, curr) => acc + curr), 0);
console.log(elfCaloriesSums);
const maxElf = Math.max(...elfCaloriesSums);
console.log('Most Calories:', maxElf);
const sortedElves = elfCaloriesSums.sort((a, b) => b - a);
const topThree = sortedElves.slice(0, 3);
const topThreeSum = topThree.reduce((acc, curr) => acc + curr, 0);
console.log('Total Calories from Top 3:', topThreeSum);
