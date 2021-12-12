const { readTestInput } = require('./readTestInput')

const caveMap = readTestInput('12').reduce((caveMapAcc, line) => ([
  ...caveMapAcc,
  line.split('-'),
  line.split('-').reverse()
]) ,[]).filter(([start, end]) => start !== 'end' && end !== 'start');


const findPaths = (caveMap) => {
  let completePaths = []
  let inProgressPaths = [['start']];
  let newPaths = []

  console.log(caveMap)
  while(inProgressPaths.length) {
    // Calculate new paths
    inProgressPaths.forEach((path) => {
      
      // Get Viable path options
      const pathOptions = caveMap.filter((option) => {
        // only consider transitions starting where we currenlty are
        if(option[0] !== path[path.length-1]) {
          return false
        }

        // only consider transitions that are not small caves we have already visited
        let hasSeenSmallCaveTwice = false
        const smallCaveCounts = path
          .filter((cave) => cave === cave.toLocaleLowerCase())
          .reduce((acc, cave) => {
            if(acc[cave]) {
              hasSeenSmallCaveTwice = true
              return { ...acc, [cave]: acc[cave] + 1 }
            }
            else return { ...acc, [cave]: 1 }
          }, {})

        const isLowerCase = option[1] === option[1].toLocaleLowerCase()
        const hasNeverBeenVisited = !smallCaveCounts[option[1]]
        const isAlowedToVisitTwice = smallCaveCounts[option[1]] && !hasSeenSmallCaveTwice
        if(isLowerCase && !hasNeverBeenVisited && !isAlowedToVisitTwice ) {
          return false
        }

        return true
      })

      
      // create path for each branch dead ends are excluded.
      pathOptions.forEach((option) => {
        newPaths.push([...path, option[1]])
      });
    })

    completePaths = [ ...completePaths, ...newPaths.filter((path) => path[path.length - 1] === 'end')]
    inProgressPaths = newPaths.filter((path) => path[path.length - 1] !== 'end')
    newPaths = [];

    if((completePaths.length % 100) || (inProgressPaths.length % 100)) {
      console.log(`${completePaths.length} found. ${inProgressPaths.length} still being considered`)
    }
  }

  return completePaths
}

const paths = findPaths(caveMap);

console.log(paths.length, 'valid paths')