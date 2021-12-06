const input = `.###..#######..####..##...#
########.#.###...###.#....#
###..#...#######...#..####.
.##.#.....#....##.#.#.....#
###.#######.###..##......#.
#..###..###.##.#.#####....#
#.##..###....#####...##.##.
####.##..#...#####.#..###.#
#..#....####.####.###.#.###
#..#..#....###...#####..#..
##...####.######....#.####.
####.##...###.####..##....#
#.#..#.###.#.##.####..#...#
..##..##....#.#..##..#.#..#
##.##.#..######.#..#..####.
#.....#####.##........#####
###.#.#######..#.#.##..#..#
###...#..#.#..##.##..#####.
.##.#..#...#####.###.##.##.
...#.#.######.#####.#.####.
#..##..###...###.#.#..#.#.#
.#..#.#......#.###...###..#
#.##.#.#..#.#......#..#..##
.##.##.##.#...##.##.##.#..#
#.###.#.#...##..#####.###.#
#.####.#..#.#.##.######.#..
.#.#####.##...#...#.##...#.`
// const input = 
// `.#..#
// .....
// #####
// ....#
// ...##`
// const input = 
// `.#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.##########...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##`

const splitField = input.split('\n').map((line) => line.split(''))

const field = splitField.map((line, y) => line.map((point, x) => ({
    val: point,
    isAsteroid: point === '#',
    x,
    y,
    canSee: 0
})))

console.log(' --- input verification ---')
console.log('Asteroid:', field[2][4])
console.log('x is 4?', field[2][4].x === 4)
console.log('y is 2?', field[2][4].y === 2 )
console.log('Max y:', field.length)
console.log('Max X:', field[0].length)

const getRadians = (a, b) => Math.atan2((a.y - b.y), (b.x - a.x))

const flatField = [].concat(...field) 
const asteroidsOnly = flatField.filter((a) => a.isAsteroid)

const asteroidsCanSee = asteroidsOnly.map((a) => {
    const radians = Array.from(new Set(asteroidsOnly.filter((b) => a.x !== b.y || b.y !== a.y ).map((b) => parseFloat(getRadians(a,b).toFixed(3)))))
    return {
        ...a,
        // radians,
        canSee: radians.length 
    }
})

const maxVisible = Math.max(...asteroidsCanSee.map(({canSee}) => canSee))
console.log(' --- Part 1 --- ')
console.log('Max Visible:', maxVisible)
const numberOfMonitoringStations = asteroidsCanSee.reduce((acc, {canSee}) => canSee === maxVisible ? acc + 1 : acc, 0)
const monitoringStation = asteroidsCanSee.find(({canSee}) => canSee === maxVisible)
console.log('Number of top asteroids:', numberOfMonitoringStations)
console.log('Monitoring Station:', monitoringStation)

const dist = (a) => Math.sqrt(Math.pow((monitoringStation.x - a.x),2) + Math.pow((monitoringStation.y - a.y),2))

const monitoringStationPlan = {
    ...monitoringStation,
    targets: asteroidsOnly.filter((b) => monitoringStation.x !== b.y || b.y !== monitoringStation.y ).map((asteroid) => {
        const rWithNeg = getRadians(monitoringStation,asteroid)
        const r = parseFloat((rWithNeg < 0 ? (2*Math.PI) + rWithNeg : rWithNeg).toFixed(3))
        return {
            x: asteroid.x,
            y: asteroid.y,
            r,
            rWithNeg: parseFloat(rWithNeg.toFixed(3)),
            d: dist(asteroid)
        }
    }).sort((a,b) => a.r != b.r ? a.r - b.r : a.d - b.d)
}


console.log(monitoringStationPlan.targets.slice(200))
const targets = monitoringStationPlan.targets.slice(1)
let lazorR = parseFloat((Math.PI / 2).toFixed(3))
let targetCount = 0
let destroyed
while(targets.length) {
    const currentIdx = targets.findIndex(({r}) => r === lazorR)
    if(currentIdx !== -1) {
        destroyed = targets.splice(currentIdx, 1)[0]
        targetCount++
        console.log(targetCount, 'TARGET DESTROYED', targetCount, destroyed, lazorR)
    }
    if (targetCount === 200) {
        console.log('200th TARGET DESTROYED', targetCount, destroyed)
        console.log('ANSWER:', (destroyed.x*100)+destroyed.y)
        break
    }
    lazorR = parseFloat((lazorR === 0 ? parseFloat((Math.PI*2).toFixed(3)) : lazorR - 0.001).toFixed(3))
    // lazorR = parseFloat((lazorR === 6.283 ? 0 : lazorR + 0.001).toFixed(3))
}

