def find_part_numbers(processed_lines):
  part_numbers = []
  for y in range(len(processed_lines)):
    for x in range(len(processed_lines[y])):
      gear_ratios = []

      if processed_lines[y][x] != '*':
        continue
      print('----------')
      print(processed_lines[y-1])
      print(processed_lines[y])
      print(processed_lines[y+1])
      print('----------')

      # Up
      if y != 0:
        check_char = processed_lines[y-1][x]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y-1][x-1] == '.' or processed_lines[y-1][x+1] == '.'):
          gear_ratios.append(int(check_char))

      # Down
      if y < len(processed_lines)-1:
        check_char = processed_lines[y+1][x]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y+1][x-1] == '.' or processed_lines[y+1][x+1] == '.'):
          gear_ratios.append(int(check_char))
      
      # Left
      if x != 0:
        check_char = processed_lines[y][x-1]
        if check_char.isdigit():
          gear_ratios.append(int(check_char))

      # Right
      if x < len(processed_lines[y])-1:
        check_char = processed_lines[y][x+1]
        if check_char.isdigit():
          gear_ratios.append(int(check_char))
      
      # Up Left
      if y != 0 and x != 0:
        check_char = processed_lines[y-1][x-1]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y-1][x] == '.'):
          gear_ratios.append(int(check_char))

      # Up Right
      if y != 0 and x < len(processed_lines[y])-1:
        check_char = processed_lines[y-1][x+1]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y-1][x] == '.'):
          gear_ratios.append(int(check_char))

      # Down Left
      if y < len(processed_lines)-1 and x != 0:
        check_char = processed_lines[y+1][x-1]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y+1][x] == '.'):
          gear_ratios.append(int(check_char))

      # Down Right
      if y < len(processed_lines)-1 and x < len(processed_lines[y])-1:
        check_char = processed_lines[y+1][x+1]
        if check_char.isdigit() and (int(check_char) not in gear_ratios or processed_lines[y+1][x] == '.'):
          gear_ratios.append(int(check_char))

      if len(gear_ratios) == 2:
        print(gear_ratios)
        part_numbers.append(gear_ratios[0] * gear_ratios[1])

  return part_numbers

def process_line(line):
  indexes_to_replace = []
  number_string = ''
  for char_idx in range(len(line)):
    char = line[char_idx]
    if char.isdigit():
      indexes_to_replace.append(char_idx)
      number_string += char
      for index in indexes_to_replace:
        line[index] = number_string
    else:
      indexes_to_replace = []
      number_string = ''
  return line


def read_file(filename):
  with open(filename, "r") as file:
    lines = [[*line.replace('\n', '')] for line in file.readlines()]
    return lines

def main():
  tests = ['test.txt', 'test2.txt', 'test3.txt', 'input.txt']
  answers = [4361, 6756, 6756, 1]
  for test_idx in range(len(tests)):
    print('\n\nTest', test_idx+1)
    lines = read_file(tests[test_idx])
    processed_lines = [process_line(line) for line in lines]
    part_numbers = find_part_numbers(processed_lines)
    # print(part_numbers)
    sum_of_parts = sum([int(part) for part in part_numbers])
    print('expected:', answers[test_idx], '    recieved:', sum_of_parts)

if __name__ == "__main__":
  main()