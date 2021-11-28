class Processor:

  def __init__(self):
    """ default constructor """
    self.memory = {}
    self.MAX_INT = 65535

  def parseValue(self, valString):
    if valString in self.memory:
      return self.memory[valString]
    elif valString.isdigit():
      return int(valString)
    else:
      return 0

  def parseLhsRhs(self, lhsString, rhsString):
    """ parses lhs and rhs unless it exists within memory """
    return self.parseValue(lhsString), self.parseValue(rhsString)

  def get(self, register):
    return self.memory[register]

  def _insert(self, valString, register):
    """ inserts the int at valString into the register """
    self.memory[register] = self.parseValue(valString)

  def _and(self, lhsString, rhsString, register):
    """ performs a bitwise and on lhs and rhs, storing in the register """
    lhs, rhs = self.parseLhsRhs(lhsString, rhsString)
    self.memory[register] = lhs & rhs

  def _lshift(self, lhsString, rhsString, register):
    """ performs a left shift op on lhs by rhs and stores in the register"""
    lhs, rhs = self.parseLhsRhs(lhsString, rhsString)
    self.memory[register] = lhs << rhs

  def _rshift(self, lhsString, rhsString, register):
    """ performs a left shift op on lhs by rhs and stores in the register"""
    lhs, rhs = self.parseLhsRhs(lhsString, rhsString)
    self.memory[register] = lhs >> rhs

  def _or(self, lhsString, rhsString, register):
    """ performs a bitwise or op on lhs and rhs and stores in the register"""
    lhs, rhs = self.parseLhsRhs(lhsString, rhsString)
    self.memory[register] = lhs | rhs

  def _not(self, valString, register):
    """ performs a bitwise compliment on the value and stores in the register"""
    val = self.parseValue(valString)
    self.memory[register] = ~ val

  def processInstruction(self, opString):
    """ processes an instruction string and performs the encoded op """
    elements = opString.split(' ')
    if elements[0] == 'NOT':
      _, valString, _, register = elements
      self._not(valString, register)
    elif elements[1] == 'AND':
      lhs, _, rhs, _, register = elements
      self._and(lhs, rhs, register)
    elif elements[1] == 'OR':
      lhs, _, rhs, _, register = elements
      self._or(lhs, rhs, register)
    elif elements[1] == 'LSHIFT':
      lhs, _, rhs, _, register = elements
      self._lshift(lhs, rhs, register)
    elif elements[1] == 'RSHIFT':
      lhs, _, rhs, _, register = elements
      self._rshift(lhs, rhs, register)
    else:
      valString, _, register = elements
      self._insert(valString, register)

    print(self.memory[register])

    if self.memory[register] > self.MAX_INT:
      self.memory[register] = self.memory[register] - self.MAX_INT + 1

    if self.memory[register] < 0:
      self.memory[register] = self.memory[register] + self.MAX_INT + 1



def readInput():
  """ reads challenge input """
  with open('input.txt') as f:
    return f.read().split('\n')

def main():
  """ program point of entry """
  instructions = [
    '123 -> x',
    '456 -> y',
    'x AND y -> d',
    'x OR y -> e',
    'x LSHIFT 2 -> f',
    'y RSHIFT 2 -> g',
    'NOT x -> h',
    'NOT y -> i'
  ]

  instructions = readInput()

  processor = Processor()

  for instruction in instructions:
    print(instruction)
    processor.processInstruction(instruction)

  print(processor.memory)


if __name__ == '__main__':
  main()