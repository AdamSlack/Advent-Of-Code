const fs = require('fs')

const [firstWireVectors, secondWireVectors] = fs.readFileSync('day_03.csv', 'utf-8').split('\n').map((line) => line.split(',')).slice(0,2)
// const [firstWireVectors, secondWireVectors] = fs.readFileSync('day_03_test.csv', 'utf-8').split('\n').map((line) => line.split(',')).slice(0,2)
// const [firstWireVectors, secondWireVectors] = fs.readFileSync('day_03_test2.csv', 'utf-8').split('\n').map((line) => line.split(',')).slice(0,2)
// const [firstWireVectors, secondWireVectors] = fs.readFileSync('day_03_test3.csv', 'utf-8').split('\n').map((line) => line.split(',')).slice(0,2)

const dirMap = {
    'U': 1,
    'R': 1,
    'D': -1,
    'L': -1,
}

const computeAllPoints = (vectors) => {
    let points = [[0,0]]
    for (let vec of vectors) {
        const dir = vec[0]
        const mag = dirMap[dir]
        const dist = parseInt(vec.slice(1), 10)
        let i = 0
        while (i < dist) {
            const pos = points.length - 1
            if(dir === 'U' || dir === 'D') {
                points.push([points[pos][0], points[pos][1] + mag])
            } else {
                points.push([points[pos][0] + mag, points[pos][1]])
            }
            i++
        }
    }
    return points
}

const wireA = computeAllPoints(firstWireVectors)
const wireB = computeAllPoints(secondWireVectors)

const hits = []
console.log('wireA', wireA.length, 'wireB', wireB.length)
for( let ap of wireA) {
    for (let bp of wireB) {
        if(ap[0] === bp[0] && ap[1] === bp[1]) {
            console.log('Collision!', ap)
            hits.push(ap)
        }
    }
}
const collisions = hits.slice(1)
const manhattans = collisions.sort(([x1, y1], [x2, y2]) => (Math.abs(x1) + Math.abs(y1)) - (Math.abs(x2) + Math.abs(y2)))
const closest = manhattans[0]
console.log('CLOSEST:', closest, Math.abs(closest[0]) + Math.abs(closest[1]), '\n')

const numbersOfSteps = []

for(let p of collisions) {
    console.log(p)
    const aIndex = wireA.findIndex(([x, y]) => x === p[0] && y === p[1])
    const bIndex = wireB.findIndex(([x, y]) => x === p[0] && y === p[1])
    numbersOfSteps.push({collision: p, aIndex, bIndex, sum: aIndex + bIndex})
}

const sorted = numbersOfSteps.sort((a, b) => a.sum - b.sum)
console.log(sorted)
console.log('Shortest path', sorted[0])
