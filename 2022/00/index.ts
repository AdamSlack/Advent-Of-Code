import { readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const input = readInput('test').split('\n\n');

console.log(input)