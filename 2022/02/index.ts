import { readFileSync } from 'fs'
import { join as joinPath } from 'path'

const readInput = (fileName: 'test' | 'part_1' | 'part_2'): string => {
  const fp = joinPath(__dirname, 'inputs', `${fileName}.txt`);
  return readFileSync(fp, 'utf-8');
}

const winningMoves: Record<string, string> = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X',
}

const drawingMoves: Record<string, string> = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z',
}

const losingMoves: Record<string, string> = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y',
}

const moveScores: Record<string, number> = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

const actions: Record<string, (elfMove:string) => string> = {
  'X': (elfMove: string) => losingMoves[elfMove], 
  'Y': (elfMove: string) => drawingMoves[elfMove], 
  'Z': (elfMove: string) => winningMoves[elfMove], 
}

const input = readInput('part_1').split('\n').map((line) => line.split(' '));

console.log(input)


const score = input.reduce((score, currentMatch) => {
  const elfMove = currentMatch[0];
  const myMove = actions[currentMatch[1]](elfMove);

  const isWin = winningMoves[elfMove] === myMove;
  const isDraw = drawingMoves[elfMove] === myMove;

  console.log(moveScores[myMove], (isDraw ? 3 : 0), (isWin ? 6 : 0))

  return score + moveScores[myMove] + (isDraw ? 3 : 0) + (isWin ? 6 : 0)
}, 0);

console.log(score)