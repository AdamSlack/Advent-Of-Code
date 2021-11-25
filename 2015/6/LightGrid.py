class LightGrid():
  """ A grid of lights """
  lights = [[0 for _ in range(0, 1000)] for _ in range(0, 1000)]

  def __init__(self):
    """ cosntructor """
    self.actionMap = {
      'toggle': self.toggle,
      'turn on': self.turnOn,
      'turn off': self.turnOff
    }

  def toggle(self, x, y):
    """ toggles a light at pos x,y """
    self.lights[x][y] += 2
    # if(self.lights[x][y] == 0):
    #   self.lights[x][y] = 1
    # else:
    #   self.lights[x][y] = 0

  def turnOn(self, x, y):
    """ turns on a light at pos x,y """
    self.lights[x][y] += 1

  def turnOff(self, x, y):
    """ turns off a light at pos x,y"""
    if self.lights[x][y] > 0:
      self.lights[x][y] -= 1

  def actionLightQuad(self, action, topLeft, bottomRight):
    """ performs an action to all lights in a rectangle starting at topLeft and bottomRight """
    actionFn = self.actionMap[action]

    for i in range(topLeft[0], bottomRight[0]+1):
      for j in range(topLeft[1], bottomRight[1]+1):
        actionFn(i,j)

  def getTotalBrightness(self):
    """ calculates total brightness by summing all lights in the grid """
    return sum([sum(row) for row in self.lights])