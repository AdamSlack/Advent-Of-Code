const fs = require('fs')


const fp = './input.txt'
// const fp = './test_input.txt'
const trees = fs.readFileSync(fp, 'utf-8').split('\n').map((row) => row.split(''));

const width = trees[0].length
const height = trees.length

const traverseSlope = (xStep, yStep) => {
  const pos = {
    x: 0,
    y: 0,
  }
  
  let treeCount = 0
  
  while (pos.y < height) {
    if(trees[pos.y][pos.x] === '#') {
      treeCount++
    }
    pos.x += xStep
    pos.y += yStep
    pos.x %= width
  }
  return treeCount
}

const slopes = [
  { xStep: 1, yStep: 1 },
  { xStep: 3, yStep: 1 },
  { xStep: 5, yStep: 1 },
  { xStep: 7, yStep: 1 },
  { xStep: 1, yStep: 2 },
]

const treeCounts = slopes.map(({ xStep, yStep }) => traverseSlope(xStep, yStep))
const treeProduct = treeCounts.reduce((acc, treeCount) => acc * treeCount, 1)
console.log(treeCounts)
console.log(treeProduct)