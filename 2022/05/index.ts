import { access, readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const [stackSetString, instructionSetString] = readInput('part_1').split('\n\n');

const stackLines = stackSetString.split('\n');
const stackIds = stackLines[stackLines.length - 1].trim().split('   ');
const stackContentStrings = stackLines.slice(0, -1).reverse();

const stacks = stackIds.reduce<Record<string, string[]>>((acc, id) => ({ ...acc, [id]: [] }), {});

stackContentStrings.forEach((stackLine) => {
  stackIds.forEach((id, stackIdx) => {
    const valIdx = (stackIdx * 4) + 1
    const stackVal = stackLine[valIdx];
    if(stackVal !== ' ') { 
      stacks[id].push(stackVal)
    }
  })
});

instructionSetString.split('\n').forEach((line) => {
  const instruction = line.replace('move ', '').replace(' from ', ',').replace(' to ', ',');
  const [countStr, fromId, toId] = instruction.split(',');
  const count = parseInt(countStr, 10);

  const cratesToMove = stacks[fromId].splice(stacks[fromId].length-count);
  stacks[toId] = [...stacks[toId], ...cratesToMove];
  console.log(count, fromId, toId)
});

console.log(stacks)

const topCrateString = Object.values(stacks).map((stack) => stack[stack.length-1]).join('')
console.log(topCrateString)
