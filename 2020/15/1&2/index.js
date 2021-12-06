// const input = [0,3,6]
// const input = [1,3,2]
// const input = [2,1,3]
// const input = [1,2,3]
// const input = [2,3,1]
const input = [1,0,18,10,19,6]

const ages = {}

let turn = 1
const turnLimit = 2020

let lastNum = -1
input.forEach((num) => {
  ages[num] = { turns: [turn]  }
  lastNum = num
  turn++
})

while(turn <= 30000000) {
  if(ages[lastNum].turns.length > 1) {
    const { turns } = ages[lastNum]
    lastNum = turns[turns.length-1] - turns[turns.length-2]
  } else {
    lastNum = 0
  }

  if(ages[lastNum]) {
    ages[lastNum].turns = [
      ages[lastNum].turns[ages[lastNum].turns.length-1],
      turn
    ]
  }
  else {
    ages[lastNum] = { turns: [turn] }
  }
  turn++
  if(turn % 100000 === 0) {
    console.log(turn)
  }
}

console.log(lastNum)