
def main():
  """Main function"""

  with open('input.txt') as f:
    lines = f.readlines()[0]

  # lines = '^>v<'
  # lines = '^v^v^v^v^v'

  santaPos = [0,0]
  roboPos = [0,0]
  
  santaVisited = set()
  roboVisited = set()

  santaVisited.add('0,0')
  roboVisited.add('0,0')

  for idx, movement in enumerate(lines):
    print(movement)
    if(idx % 2 == 0):
      if(movement == '>'):
        santaPos[0] += 1
      elif(movement == '<'):
        santaPos[0] -= 1
      elif(movement == '^'):
        santaPos[1] += 1
      elif(movement == 'v'):
        santaPos[1] -= 1
      santaVisited.add('{x},{y}'.format(x=santaPos[0], y=santaPos[1]))
    
    if(idx % 2 == 1):
      if(movement == '>'):
        roboPos[0] += 1
      elif(movement == '<'):
        roboPos[0] -= 1
      elif(movement == '^'):
        roboPos[1] += 1
      elif(movement == 'v'):
        roboPos[1] -= 1  
      santaVisited.add('{x},{y}'.format(x=roboPos[0], y=roboPos[1]))

  print(len(santaVisited))


if __name__ == '__main__':
  main()