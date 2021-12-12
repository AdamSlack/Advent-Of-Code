const { readTestInput } = require('./readTestInput');

const testInput = readTestInput('10', false).map((line) => line.split(''));

const chunkPairs = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
}
const chunkOpeners = new Set(Object.keys(chunkPairs))
const chunkClosers = new Set(Object.values(chunkPairs))

const chunkCloserScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const illegalCharacters = testInput.map((line) => {
  const chunkOpenerQueue = []

  for(const char of line) {
    if(chunkOpeners.has(char)) {
      chunkOpenerQueue.push(char);
    }
    else {
      const lastChunkOpener = chunkOpenerQueue.pop()
      if(char !== chunkPairs[lastChunkOpener]) {
        return char
      }
    }
  }
}).filter((char) => !!char)

const score = illegalCharacters.reduce((sum, char) => sum + chunkCloserScores[char], 0)

// console.log(illegalCharacters)
console.log('Corrupted Score', score)

const incompleteLineChunks = testInput.map((line) => {
  const chunkOpenerQueue = []

  for(const char of line) {
    if(chunkOpeners.has(char)) {
      chunkOpenerQueue.push(char);
    }
    else {
      const lastChunkOpener = chunkOpenerQueue.pop()
      if(char !== chunkPairs[lastChunkOpener]) {
        return undefined
      }
    }
  }
  return chunkOpenerQueue
}).filter((line) => !!line)


const requiredClosers = incompleteLineChunks.map((chunkOpeners) => {
  return chunkOpeners.reverse().map((chunkOpener) => chunkPairs[chunkOpener])
})

const chunkCompleterScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const requiredCloserScores = requiredClosers.map((line) => {
  return line.reduce((acc, curr) => (acc*5) + chunkCompleterScores[curr] , 0)
}).sort((a,b) => a-b)

const midIndx = Math.floor(requiredCloserScores.length/2)
console.log(requiredCloserScores[midIndx])
