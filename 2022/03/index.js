"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readInput = (fileName) => {
    const fp = (0, path_1.join)(__dirname, 'inputs', `${fileName}.txt`);
    return (0, fs_1.readFileSync)(fp, 'utf-8');
};
const input = readInput('part_1').split('\n');
const priorityList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const rucksackCompartments = input.map((rucksack) => {
    const middleItemIdx = Math.ceil(rucksack.length / 2);
    return {
        front: rucksack.slice(0, middleItemIdx),
        back: rucksack.slice(middleItemIdx),
    };
});
let prioritySum = 0;
priorityList.forEach((val, idx) => {
    const priorityIdx = idx += 1;
    for (let i = 0; i < rucksackCompartments.length - 2; i += 3) {
        const first = rucksackCompartments[i];
        const second = rucksackCompartments[i + 1];
        const third = rucksackCompartments[i + 2];
        // if(idx < 2) return;
        const valInGroup = (first.front.includes(val) || first.back.includes(val)) &&
            (second.front.includes(val) || second.back.includes(val)) &&
            (third.front.includes(val) || third.back.includes(val));
        if (valInGroup) {
            prioritySum += priorityIdx;
        }
    }
    ;
});
console.log(rucksackCompartments);
console.log(prioritySum);
