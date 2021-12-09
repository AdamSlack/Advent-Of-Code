const { readTestInput } = require('./readTestInput')

const data = readTestInput('08', false).map((line) => {
  const [input, output] = line.split(' | ')
  return {
    input: input.split(' '),
    output: output.split(' '),
  }
});


const numberSegmentCounts = {
  '1' : 2,
  '4' : 4,
  '7' : 3,
  '8' : 7,
};
const numberSegmentSet = new Set(Object.values(numberSegmentCounts))

const occurences = data.reduce((fileSum, { output }) => {
  return fileSum + output.reduce((lineSum, valString) => {
    return lineSum + (numberSegmentSet.has(valString.length) ? 1 : 0)
  },0)
}, 0)

const numberMaps = data.map(({input, output}) => {
  const numberMap = {
    '1': input.find((val) => val.length === 2),
    '4': input.find((val) => val.length === 4),
    '7': input.find((val) => val.length === 3),
    '8': input.find((val) => val.length === 7),
  }

  return numberMap
});

console.log(data[0], numberMaps[0])