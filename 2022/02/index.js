"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readInput = (fileName) => {
    const fp = (0, path_1.join)(__dirname, 'inputs', `${fileName}.txt`);
    return (0, fs_1.readFileSync)(fp, 'utf-8');
};
const winningMoves = {
    'A': 'Y',
    'B': 'Z',
    'C': 'X',
};
const drawingMoves = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z',
};
const losingMoves = {
    'A': 'Z',
    'B': 'X',
    'C': 'Y',
};
const moveScores = {
    'X': 1,
    'Y': 2,
    'Z': 3,
};
const actions = {
    'X': (elfMove) => losingMoves[elfMove],
    'Y': (elfMove) => drawingMoves[elfMove],
    'Z': (elfMove) => winningMoves[elfMove],
};
const input = readInput('part_1').split('\n').map((line) => line.split(' '));
console.log(input);
const score = input.reduce((score, currentMatch) => {
    const elfMove = currentMatch[0];
    const myMove = actions[currentMatch[1]](elfMove);
    const isWin = winningMoves[elfMove] === myMove;
    const isDraw = drawingMoves[elfMove] === myMove;
    console.log(moveScores[myMove], (isDraw ? 3 : 0), (isWin ? 6 : 0));
    return score + moveScores[myMove] + (isDraw ? 3 : 0) + (isWin ? 6 : 0);
}, 0);
console.log(score);
