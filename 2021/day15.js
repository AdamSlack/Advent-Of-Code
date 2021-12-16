const { readTestInput } = require('./readTestInput')

const riskMap = readTestInput('15', false)
  .map((line) => line.split('').map((char) => parseInt(char, 10)));

console.log(riskMap)

const getNewPath = (riskMap, path, newX, newY) => {
  const coords = [...path.coords, [newX, newY]]

  return {
    coords,
    coordString: coords.join(':'),
    vals: [...path.vals,  riskMap[newY][newX]],
    totalRisk: path.totalRisk + riskMap[newY][newX],
    lastX: newX,
    lastY: newY,
  }
}

const alreadyVisited = (path, newX, newY) => {
  return !!path.coords.find((coord) => coord[0] === newX && coord[1] === newY)
}

const getFirstPathRisk = (riskMap) => {
  const lastLine = riskMap[riskMap.length-1].slice(1);
  const firstColumn = riskMap.map((line) => line[0])
  return lastLine.reduce((sum, curr) => sum+curr,0) + firstColumn.reduce((sum, curr) => sum+curr,0)
}

const findSafestPath = (riskMap) => {
  let completedPaths = []
  let inProgressPaths = [{ coords: [[0,0]], vals: [riskMap[0][0]], totalRisk: 0, lastX: 0, lastY:0 }]
  let lowestRiskLevel = getFirstPathRisk(riskMap)

  while(inProgressPaths.length) {
    let newInProgressPaths = inProgressPaths.slice(500)
    
    // Extend into new path options
    inProgressPaths
    .slice(0, 500)
    .forEach((path) => {
      const [currX, currY] = path.coords[path.coords.length - 1];

      const newOptions = []
      // if( currX > 0 && !alreadyVisited(path, currX-1, currY)) {
      //   newInProgressPaths.push(getNewPath(riskMap, path, currX-1, currY))
      // }

      if( currX < riskMap[0].length-1 && !alreadyVisited(path, currX+1, currY) ) {
        newOptions.push(getNewPath(riskMap, path, currX+1, currY))
      }
      
      // if( currY > 0 && !alreadyVisited(path, currX, currY-1) ) {
      //   newInProgressPaths.push(getNewPath(riskMap, path, currX, currY-1))
      // }
      
      if( currY < riskMap.length-1 && !alreadyVisited(path, currX, currY+1) ) {
        newOptions.push(getNewPath(riskMap, path, currX, currY+1))
      }

      const currMin = Math.min(...newOptions.map(({totalRisk}) => totalRisk))

      newOptions.forEach((option) => {
        if(option.totalRisk === currMin) {
          newInProgressPaths.push(option)
        }
      })
    })

    completedPaths = [
      ...completedPaths,
      ...newInProgressPaths
        .filter(({lastX, lastY}) => lastX === riskMap[0].length-1 && lastY === riskMap.length-1)
    ]
    lowestRiskLevel = Math.min(...completedPaths.map(({totalRisk}) => totalRisk), lowestRiskLevel);
    inProgressPaths = newInProgressPaths
      .filter(({ totalRisk }) => totalRisk < lowestRiskLevel)
      .filter(({ lastX, lastY }) => lastX !== riskMap[0].length-1 || lastY !== riskMap.length-1)
      // .sort((a,b) => a.totalRisk - b.totalRisk)
      // .sort((a,b) => (a.totalRisk/a.coords.length) - (b.totalRisk/b.coords.length))
      .sort((a,b) => b.coords.length - a.coords.length)
    
    console.log(inProgressPaths.length, completedPaths.length, lowestRiskLevel, inProgressPaths[0] ? `${inProgressPaths[0].totalRisk} ${inProgressPaths[0].coords.length}`: 'done')
  }

  return completedPaths.sort((a,b) => a.totalRisk - b.totalRisk)[0]
}

const safestPath = findSafestPath(riskMap);

console.log(safestPath)