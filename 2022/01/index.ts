import { readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const input = readInput('part_1').split('\n\n').filter((line) => !!line).map((line: string) => line.split('\n').map((calories) => parseInt(calories, 10), 0));
console.log(input)

const elfCaloriesSums = input.map((elfCalories) => elfCalories.reduce((acc, curr) => acc + curr), 0);
console.log(elfCaloriesSums);

const maxElf = Math.max(...elfCaloriesSums)
console.log('Most Calories:', maxElf)

const sortedElves = elfCaloriesSums.sort((a, b) => b-a);
const topThree = sortedElves.slice(0, 3);
const topThreeSum = topThree.reduce((acc, curr) => acc+curr, 0);
console.log('Total Calories from Top 3:', topThreeSum);
 

// const foo = readFileSync('inputs/part_1.txt', 'utf-8')
//   .split('\n\n')
//   .filter((line) => !!line)
//   .map((line: string) => line.split('\n').reduce((acc, curr) => acc + parseInt(curr, 10), 0))
//   .sort((a,b) => b-a)
//   .slice(0, 3)
//   .reduce((acc, curr) => acc+curr, 0);
// console.log(foo)