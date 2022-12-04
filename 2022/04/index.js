"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readInput = (fileName) => {
    const fp = (0, path_1.join)(__dirname, 'inputs', `${fileName}.txt`);
    return (0, fs_1.readFileSync)(fp, 'utf-8');
};
const input = readInput('part_1')
    .split('\n')
    .map((line) => line.split(',').map((range) => range.split('-').map((numStr) => parseInt(numStr, 10))));
const totalContainments = input.reduce((acc, curr) => {
    let first = curr[0];
    let second = curr[1];
    // let bigger;
    // let smaller;
    // if(first[1] - first[0] > second[1] - second[0]) {
    //   bigger = first;
    //   smaller = second;
    // } else {
    //   bigger = second;
    //   smaller = first;
    // }
    // if(bigger[0] <= smaller[0] && bigger[1] >= smaller[1]) {
    //   return acc + 1
    // }
    // else return acc;
    const hasOverlap = (first[0] >= second[0] && first[0] <= second[1])
        || (first[1] >= second[0] && first[1] <= second[1])
        || (second[0] >= first[0] && second[0] <= first[1])
        || (second[1] >= first[0] && second[1] <= first[1]);
    if (hasOverlap)
        return acc + 1;
    return acc;
}, 0);
console.log(input.length);
console.log(totalContainments);
