import hashlib

def main():
  """ main """
  

  for i in range(1, 10000000):
    hashString = 'ckczppom{salt}'.format(salt=i)
    hashValue = hashlib.md5(hashString.encode())
    result = hashValue.hexdigest()[0:6]
    if(result == '000000'):
      print('winner:', i)
      return

    if(i%1000 == 0):
      print(i, result)
      


if __name__ == '__main__':
  main()