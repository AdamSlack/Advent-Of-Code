const fs = require('fs')


// const fp = './input.txt'
const fp = './test_input.txt'
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

const treeCount = traverseSlope(3, 1)
console.log(treeCount)