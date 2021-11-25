from LightGrid import LightGrid

def readInput():
  """ reads challenge input """
  with open('input.txt') as f:
    return f.readlines()

def getInstruction(line):
  """ takes an input line and turns it into an action w/ co-ordinates """
  noThrough = line.replace('through ', '')
  spaceSplit = noThrough.split(' ')

  bottomRight = [ int(x) for x in spaceSplit[-1].split(',')]
  topLeft = [ int(x) for x in spaceSplit[-2].split(',')]
  
  action = spaceSplit[0]
  if action == 'turn':
    action = f'{action} {spaceSplit[1]}'
  
  return action, topLeft, bottomRight

def main():
  """ program point of entry """
  lines = readInput()
  # lines = ['turn on 0,0 through 999,999', 'toggle 0,0 through 999,0', 'turn off 499,499 through 500,500']
  actions = [getInstruction(line) for line in lines]

  lightGrid = LightGrid()

  for action, topLeft, bottomRight in actions:
    print(action, topLeft, bottomRight)
    lightGrid.actionLightQuad(action, topLeft, bottomRight)

  print(lightGrid.getTotalBrightness())


if __name__ == '__main__':
  main()