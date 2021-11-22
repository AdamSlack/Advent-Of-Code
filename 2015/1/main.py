

def main():
  """Main function"""

  with open('input.txt') as f:
    lines = f.readlines()

  ups = len(lines[0].replace(')', ''))
  downs = len(lines[0].replace('(', ''))

  print('final floor:', ups - downs)

  currFloor = 0

  for idx, action in enumerate(lines[0]):
    if action == ')':
      currFloor -= 1

    if action == '(':
      currFloor += 1

    if(currFloor == -1):
      print('entered basement on action:', idx+1)
      exit(0)

if __name__ == '__main__':
  main()