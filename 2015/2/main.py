
def getSurfaceAreaWithOverlap(present):
  """2*l*w + 2*w*h + 2*h*l"""
  dims = [ int(x) for x in present.split('x') ]
  l, w, h = dims
  sides = [l*w, w*h, h*l]

  return  sum([2*x for x in sides]) + min(sides)

def getPerfectBowLength(present):
  dims = [ int(x) for x in present.split('x') ]
  l, w, h = dims
  perims = [
    (2*l)+(2*h),
    (2*l)+(2*w),
    (2*w)+(2*h)
  ]
  return min(perims) + (l*w*h)

def main():
  """Main function"""

  with open('input.txt') as f:
    lines = f.readlines()

  # lines = ['2x3x4', '1x1x10']
  presentPaperAreas = [ getSurfaceAreaWithOverlap(present) for present in lines]
  print(sum(presentPaperAreas))  

  presentBowLengths = [ getPerfectBowLength(present) for present in lines ]
  print(sum(presentBowLengths))


if __name__ == '__main__':
  main()