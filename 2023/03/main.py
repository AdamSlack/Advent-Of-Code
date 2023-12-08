def find_part_numbers(processed_lines):
  part_numbers = []
  last_part_y = None
  for y in range(len(processed_lines)):
    last_checked = None
    for x in range(len(processed_lines[y])):
      is_part_number = False

      if not processed_lines[y][x].isdigit():
        last_part_y = None
        continue

      # Up
      if y != 0:
        check_char = processed_lines[y-1][x]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      # Down
      if y < len(processed_lines)-1:
        check_char = processed_lines[y+1][x]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True
      
      # Left
      if x != 0:
        check_char = processed_lines[y][x-1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      # Right
      if x < len(processed_lines[y])-1:
        check_char = processed_lines[y][x+1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True
      
      # Up Left
      if y != 0 and x != 0:
        check_char = processed_lines[y-1][x-1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      # Up Right
      if y != 0 and x < len(processed_lines[y])-1:
        check_char = processed_lines[y-1][x+1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      # Down Left
      if y < len(processed_lines)-1 and x != 0:
        check_char = processed_lines[y+1][x-1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      # Down Right
      if y < len(processed_lines)-1 and x < len(processed_lines[y])-1:
        check_char = processed_lines[y+1][x+1]
        if not check_char.isdigit() and check_char != '.':
          is_part_number = True

      if is_part_number and (last_part_y != y or processed_lines[y][x] != last_checked or not (len(part_numbers) > 0 and part_numbers[len(part_numbers) - 1] == processed_lines[y][x])):
        last_part_y = y
        part_numbers.append(processed_lines[y][x])

      last_checked = processed_lines[y][x]

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
  answers = [4361, 925, 413, 1]
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