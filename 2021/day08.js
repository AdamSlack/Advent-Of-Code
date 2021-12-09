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

const printSegmentMap = (segmentMap) => {
  const {top, topLeft, bottomLeft, bottom, topRight, bottomRight, middle} = segmentMap
  console.log(` ${top}${top}${top}${top}
${topLeft}    ${topRight}
${topLeft}    ${topRight}
 ${middle}${middle}${middle}${middle}
${bottomLeft}    ${bottomRight}
${bottomLeft}    ${bottomRight}
 ${bottom}${bottom}${bottom}${bottom}
 
  `) 
}

const numberMaps = data.map(({input, output}) => {

  const segmentMap = {
    'top': '?',
    'middle': '?',
    'bottom': '?',
    'topLeft': '?',
    'topRight': '?',
    'bottomLeft': '?',
    'bottomRight': '?',
  }

  const numberMap = {
    '1': input.find((val) => val.length === 2),
    '4': input.find((val) => val.length === 4),
    '7': input.find((val) => val.length === 3),
    '8': input.find((val) => val.length === 7),
  }
  
  segmentMap.top = numberMap['7'].split('').find((char) => !numberMap['1'].includes(char))

  numberMap['6'] = input.find((val) => {
    return val.length === 6 
    && (!val.includes(numberMap['1'][0]) || !val.includes(numberMap['1'][1]))
  });

  segmentMap.topRight = numberMap['1'].split('').find((char) => !numberMap[6].includes(char))
  segmentMap.bottomRight = numberMap['1'].split('').find((char) => numberMap[6].includes(char))

  numberMap['3'] = input.find((val) => {
    return val.length === 5
      && val.includes(segmentMap.topRight)
      && val.includes(segmentMap.bottomRight)
  })

  numberMap['5'] = input.find((val) => {
    return val.length === 5
      && !val.includes(segmentMap.topRight)
  })

  numberMap['2'] = input.find((val) => {
    return val.length === 5
      && !val.includes(segmentMap.bottomRight)
  })

  numberMap['9'] = input.find((val) => {
    return val.length === 6 
    && numberMap['3'].split('').every((char) => val.includes(char))
  })

  segmentMap.bottom = numberMap['9'].split('').find((char) => {
    return char !== segmentMap.top
      && !numberMap['4'].includes(char)
  })

  segmentMap.middle = numberMap['3'].split('').find((char) => {
    return char !== segmentMap.top &&
    char !== segmentMap.topRight &&
    char !== segmentMap.bottomRight &&
    char !== segmentMap.bottom
  })

  numberMap['0'] = input.find((val) => {
    return val.length === 6
    && !val.includes(segmentMap.middle)
  })

  segmentMap.topLeft = numberMap['5'].split('').find((char) => {
    return char !== segmentMap.middle
    && numberMap['0'].includes(char)
  });

  segmentMap.bottomLeft = numberMap['2'].split('').find((char) => {
    return char !== segmentMap.middle
    && numberMap['0'].includes(char)
  });
  return { numberMap, segmentMap, input, output }
});

const {segmentMap, numberMap} = numberMaps[0]

console.log(data[0], numberMap)
printSegmentMap(segmentMap)

const decodedDigits = numberMaps.map(({output, numberMap}) => {
  const numberEntries = Object.entries(numberMap)
  const digits = output.map((digit) => {
    return numberEntries.find(([_, val]) => {
      return digit.split('').every((char) => val.includes(char)) && val.length === digit.length 
    })[0]
  })
  console.log(numberEntries)
  console.log(output)
  return parseInt(digits.join(''),10)
});

console.log(decodedDigits)

console.log(decodedDigits.reduce((sum, curr) => sum + curr, 0))