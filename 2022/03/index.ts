import { readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const input = readInput('part_1').split('\n');

const priorityList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const rucksackCompartments = input.map((rucksack) => {
  const middleItemIdx = Math.ceil(rucksack.length / 2);
  return {
    front: rucksack.slice(0, middleItemIdx),
    back: rucksack.slice(middleItemIdx),
  }
});

let prioritySum = 0;
priorityList.forEach((val, idx) => {
  const priorityIdx = idx += 1;
  for(let i = 0; i < rucksackCompartments.length - 2; i += 3) {
    const first = rucksackCompartments[i];
    const second = rucksackCompartments[i+1];
    const third = rucksackCompartments[i+2];
    // if(idx < 2) return;
    
    const valInGroup = (first.front.includes(val) || first.back.includes(val)) &&
    (second.front.includes(val) || second.back.includes(val)) &&
    (third.front.includes(val) || third.back.includes(val))
 
    if(valInGroup) {
      prioritySum += priorityIdx;
    }
  };
});

console.log(rucksackCompartments);
console.log(prioritySum);