const fs = require('fs')

const fp = './input.txt'
// const fp = './test_input.txt'
const passportTexts = fs.readFileSync(fp, 'utf-8').split('\n\n')

const passports = passportTexts.map((passportText) => {
  return passportText.split('\n').map((passportLine) => passportLine.split(' ')).flat().reduce((acc, element) => {
    const [key, val] = element.split(':')
    return {
      ...acc,
      [key]: val,
    }
  }, {})
})

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
]

numberOfValidPassports = passports.reduce((acc, passport) => requiredFields.every((key) => new Set(Object.keys(passport)).has(key)) ? acc + 1 : acc, 0)

console.log(passports)
console.log(numberOfValidPassports)