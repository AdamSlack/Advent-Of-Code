import { readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const input = readInput('part_1')
const lines = input.split('\n').map((line) => line.split('   '));

const leftList = lines.map(line => parseInt(line[0])).sort()
const rightList = lines.map(line => parseInt(line[1])).sort()

const diff = rightList.map((right, i) => Math.abs(right - leftList[i]))

const totalDiff = diff.reduce((acc, curr) => acc + curr, 0)

const similarityScores = leftList.map((left) => left * rightList.filter((right) => right === left).length)

const totalSimilarityScore = similarityScores.reduce((acc, curr) => acc + curr, 0)

console.log(rightList)
console.log(leftList)
console.log(diff)

console.log(totalDiff)

console.log(similarityScores)

console.log(totalSimilarityScore)