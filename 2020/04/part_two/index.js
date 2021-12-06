const fs = require('fs')
const { findSourceMap } = require('module')

const fp = './input.txt'
// const fp = './test_input.txt'
// const fp = './test_input_invalid.txt'
// const fp = './test_input_valid.txt'
// const fp = './test_input_mixed.txt'
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

const createNumStringValidator = (min, max, length) => {
  return (numString) => {
    return numString.length === length 
      && ((num) => num >= min && num <= max)(parseInt(numString))
  }
}

const fieldValidation = {
  byr: (birthYearString) => createNumStringValidator(1920, 2002, 4)(birthYearString),
  iyr: (issueYearString) => createNumStringValidator(2010, 2020, 4)(issueYearString),
  eyr: (expireYearString) => createNumStringValidator(2020, 2030, 4)(expireYearString),
  hgt: (heightString) => {
    if(heightString.toLowerCase().includes('cm')) {
      return createNumStringValidator(150, 193, 3)(heightString.replace('cm', ''))
    }
    if(heightString.toLowerCase().includes('in')) {
      return createNumStringValidator(59, 76, 2)(heightString.replace('in', ''))
    }
    return false
  },
  hcl: (hairString) => /^#([0-9a-f]){6}$/.test(hairString),
  ecl: (eyeString) => new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).has(eyeString),
  pid: (pidString) => /^[0-9]{9}$/.test(pidString),
}

numberOfValidPassports = passports.reduce((acc, passport) => {
  return Object.entries(fieldValidation).every(([field, isValid]) => {
    const passportFields = Object.keys(passport) 
    return new Set(passportFields).has(field) && isValid(passport[field])
  }) ? acc + 1 : acc
}, 0)

console.log(numberOfValidPassports)