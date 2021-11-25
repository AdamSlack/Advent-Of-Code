
def hasThreeVowels(stringToCheck):
  """ checks if the string has three vowels """
  vowels = 'aeiou'
  occurences = sum([stringToCheck.count(vowel) for vowel in vowels])
  return occurences >= 3

def hasDoubleLetter(stringToCheck):
  """ checks if a string has a double character """
  occurences = sum([stringToCheck.count('{char}{char}'.format(char=char)) for char in stringToCheck ])
  return occurences > 0

def hasNoDirtySubString(stringToCheck):
  """ checks if a string has a dirty substring """
  dirtyStrings = ['ab', 'cd', 'pq', 'xy']
  occurences = sum([stringToCheck.count(dirtyString) for dirtyString in dirtyStrings])
  return occurences == 0

def hasPairWithoutOverlap(stringToCheck):
  """ ensures a pair appaears twice  with no '(x{x)x}' overlaps """
  pairs = ['{first}{second}'.format(first=stringToCheck[i], second=stringToCheck[i+1]) for i in range(len(stringToCheck)-1) ]

  numOfPairs = len(pairs)
  for i in range(numOfPairs):
    for j in range(i+2, numOfPairs):
      if(pairs[i] == pairs[j]):
        return True
  return False

def hasRepeatWithSeparation(stringToCheck):
  """ ensures a character appears twice with one char between them """
  strLen = len(stringToCheck)
  for i in range(strLen-2):
    if(stringToCheck[i] == stringToCheck[i+2]):
      return True

  return False

def isNice(stringToCheck):
  """ evaluates if the given string is nice """
  checks = [hasPairWithoutOverlap, hasRepeatWithSeparation]
  return all([ check(stringToCheck) for check in checks])

def getInput():
  """ opens challenge input """
  with open('input.txt') as f:
    return f.readlines()

def main():
  """ main """
  stringsToCheck = getInput()
  # stringsToCheck = ['qjhvhtzxzqqjkmpb', 'xxyxx', 'uurcxstgmygtbstg', 'ieodomkazucvgmuy']
  totalIsNice = sum([ isNice(stringToCheck) for stringToCheck in stringsToCheck])
  
  print(totalIsNice)

if __name__ == '__main__':
  main()