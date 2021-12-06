const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'input.txt'

let lines = fs.readFileSync(fp, 'utf-8')
  .split('\n')

const arrivalTime = parseInt(lines[0], 10)
const busTimes = lines[1].split(',').filter((time) => time !== 'x').map((time) => parseInt(time, 10))

console.log(arrivalTime, busTimes)

const timesOfNextArrival = busTimes.map((time) => (time * Math.ceil(arrivalTime / time)))
const closestToArrivalIDx = timesOfNextArrival.indexOf(Math.min(...timesOfNextArrival))

const busId = busTimes[closestToArrivalIDx]
const timeWaiting = timesOfNextArrival[closestToArrivalIDx] - arrivalTime

console.log(busId, timeWaiting, timesOfNextArrival[closestToArrivalIDx])

console.log('Answer = ', busId * timeWaiting)