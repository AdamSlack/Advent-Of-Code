"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_set_1 = __importDefault(require("lodash.set"));
const lodash_get_1 = __importDefault(require("lodash.get"));
const readInput = (fileName) => {
    const fp = (0, path_1.join)(__dirname, 'inputs', `${fileName}.txt`);
    return (0, fs_1.readFileSync)(fp, 'utf-8');
};
const input = readInput('part_1').split('\n');
const pathStack = [];
let currDir = '';
const dir = input.reduce((acc, line) => {
    if (line.startsWith('$ ls')) { }
    else if (line.startsWith('$ cd')) {
        currDir = line.replace('$ cd ', '');
        if (currDir === '..') {
            currDir = pathStack.pop() || '';
        }
        else {
            pathStack.push(currDir);
        }
    }
    else if (line.startsWith('dir')) {
        const currDir = (0, lodash_get_1.default)(acc, pathStack.join('.dirs.'));
        currDir.dirs[line.replace('dir ', '')] = { size: 0, dirs: {}, files: [] };
        (0, lodash_set_1.default)(acc, pathStack.join('.dirs.'), currDir);
    }
    else {
        const [sizeString, fileName] = line.split(' ');
        const fileSize = parseInt(sizeString, 10);
        for (let i = 1; i < pathStack.length + 1; i++) {
            const pathStr = pathStack.slice(0, i).join('.dirs.');
            console.log(pathStr);
            const currDir = (0, lodash_get_1.default)(acc, pathStr);
            currDir.size += fileSize;
        }
        const currDir = (0, lodash_get_1.default)(acc, pathStack.join('.dirs.'));
        currDir.files.push({ fileName, fileSize });
        (0, lodash_set_1.default)(acc, pathStack.join('.dirs.'), currDir);
    }
    return acc;
}, { '/': { size: 0, dirs: {}, files: [] } });
console.log(JSON.stringify(dir, null, 2));
const sumDirs = (obj) => {
    let dirSize = obj.size <= 100000 ? obj.size : 0;
    const childDirs = Object.values(obj.dirs);
    if (!childDirs.length) {
        return dirSize;
    }
    return dirSize + childDirs.reduce((acc, dir) => acc + sumDirs(dir), 0);
};
const total = sumDirs(dir['/']);
console.log(total);
const diskSize = 70000000;
const reqSpace = 30000000;
const currentUsage = dir['/'].size;
const minSizeToDelete = reqSpace - (diskSize - currentUsage);
console.log({ minSizeToDelete });
console.log({ currentUsage });
let currSmallest = diskSize;
console.log({ currSmallest });
const getDirToDelete = (obj) => {
    let dirSize = obj.size;
    console.log(Object.keys(obj.dirs));
    console.log({ currSmallest, size: obj.size });
    if (obj.size <= currSmallest && obj.size >= minSizeToDelete) {
        console.log(obj.size);
        currSmallest = obj.size;
    }
    const childDirs = Object.values(obj.dirs);
    if (!childDirs.length) {
        return dirSize;
    }
    return dirSize + childDirs.reduce((acc, dir) => acc + getDirToDelete(dir), 0);
};
const dirsToDelete = getDirToDelete(dir['/']);
console.log({ currSmallest });
