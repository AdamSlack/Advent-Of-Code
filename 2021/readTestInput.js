const fs = require('fs')

const readTestInput = (day, test = false) => {
  const fileName = `day${day[0].toUpperCase()}${day.substring(1)}${test ? 'Test' : ''}.txt`
  return fs.readFileSync(fileName, 'utf-8').split('\n')
}

module.exports = {
  readTestInput,
}