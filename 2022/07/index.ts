import { readFileSync } from 'fs'
import path, { join as joinPath } from 'path'

import set from 'lodash.set';
import get from 'lodash.get';

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const input = readInput('part_1').split('\n');

const pathStack: string[] = [];
let currDir: string = '';
const dir = input.reduce((acc, line) => {
  if(line.startsWith('$ ls')) {}
  else if(line.startsWith('$ cd')) {
    currDir = line.replace('$ cd ', '');
    
    if(currDir === '..') {
      currDir = pathStack.pop() || '';
    }
    else {
      pathStack.push(currDir);
    }
  }
  else if(line.startsWith('dir')) {
    const currDir = get(acc, pathStack.join('.dirs.'));
    currDir.dirs[line.replace('dir ', '')] = { size: 0, dirs: {}, files: [] };

    set(acc, pathStack.join('.dirs.'), currDir);
  }
  else {
    const [sizeString, fileName] = line.split(' ');
    const fileSize = parseInt(sizeString, 10);

    for(let i = 1; i < pathStack.length + 1; i++) {
      const pathStr = pathStack.slice(0, i).join('.dirs.');
      console.log(pathStr)
      const currDir = get(acc, pathStr);
      currDir.size += fileSize;
    } 

    const currDir = get(acc, pathStack.join('.dirs.'));
    currDir.files.push({ fileName, fileSize });

    set(acc, pathStack.join('.dirs.'), currDir);
  }
  
  return acc;
}, { '/': { size: 0, dirs: {}, files: [] } } )

console.log(JSON.stringify(dir, null, 2))

const sumDirs = (obj: any): number => {
  let dirSize = obj.size <= 100000 ? obj.size : 0;

  const childDirs = Object.values(obj.dirs);
  if(!childDirs.length) {
    return dirSize;
  }

  return dirSize + childDirs.reduce((acc: number, dir: any) => acc + sumDirs(dir), 0)
};

const total = sumDirs(dir['/']);
console.log(total);


const diskSize = 70000000;
const reqSpace = 30000000;

const currentUsage = dir['/'].size;

const minSizeToDelete = reqSpace - (diskSize - currentUsage);
console.log({ minSizeToDelete })

console.log({ currentUsage })

let currSmallest = diskSize;
console.log({ currSmallest })

const getDirToDelete = (obj: any): number => {
  let dirSize = obj.size
  console.log(Object.keys(obj.dirs))
  console.log({ currSmallest, size: obj.size })

  if(obj.size <= currSmallest && obj.size >= minSizeToDelete) {
    console.log(obj.size)
    currSmallest = obj.size
  }

  const childDirs = Object.values(obj.dirs);
  if(!childDirs.length) {
    return dirSize;
  }

  return dirSize + childDirs.reduce((acc: number, dir: any) => acc + getDirToDelete(dir), 0)
};

const dirsToDelete = getDirToDelete(dir['/'])
console.log({ currSmallest })