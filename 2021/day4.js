const { readTestInput } = require('./readTestInput')

const input = readTestInput('four', false).join('\n')
const [numbersString, ...boardStrings] = input.split('\n\n');

let boards = boardStrings.map((boardString) => {
  const lineStrings = boardString.split('\n')
  return lineStrings.map((lineString) => {
    return lineString
            .split(' ')
            .filter((number) => !!number)
            .map((number) => ({ val: parseInt(number, 10), marked: false }));
  });
});

const numbers = numbersString.split(',').map(number => parseInt(number, 10))

const markNumber = (numberToMark) => {
  boards.forEach((board) => {
    board.forEach((line, lineIdx) => {
      line.forEach((space, numberIdx) => {
        if(space.val === numberToMark) {
          board[lineIdx][numberIdx].marked = true
        }
      })
    })
  })
}

const hasLineMarked = (board) => {
  return board.some((line) => line.every(({ marked }) => marked)) ||
    board[0].some((_, idx) => board.every((line) => line[idx].marked))
};

let winningBoard;
let winningNumber;
const getWinningBoard = () => {
  return boards.find(hasLineMarked)
}

const getRemainingBoards = () => boards.filter((board) => !hasLineMarked(board))

numbers.forEach((number) => {
  if(!winningBoard) {
    markNumber(number)
  }
  
  if(boards.length === 1) {
    winningBoard = getWinningBoard()
    winningNumber = number
  }
  boards = getRemainingBoards()
  console.log('boards remaining', boards.length)
});

console.log(winningBoard)

const sumRemainingBoard = (board) => {
  return board.reduce((boardTotal, line) => {
    return boardTotal + line.reduce((lineTotal, space) => space.marked ? lineTotal : lineTotal + space.val, 0)
  }, 0)
}

const unmarkedTotal = sumRemainingBoard(winningBoard)

console.log(unmarkedTotal, winningNumber, winningNumber*unmarkedTotal)