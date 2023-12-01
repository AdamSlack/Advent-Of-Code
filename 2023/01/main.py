def read_file(file_name):
  """Reads a file and returns a list of lists"""
  with open(file_name, "r") as file:
    return ["".join(line.strip()) for line in file.readlines()]
  
def find_first_and_last_digit_in_line(line):
  """Finds the first and last digit in a line"""
  for i in range(len(line)):
    char = starts_with_number_as_string(line[i:]) or line[i]
    if char.isdigit():
      first_digit = char
      break
  for i in range(len(line)-1, -1, -1):
    char = starts_with_number_as_string(line[i:]) or line[i]
    if char.isdigit():
      last_digit = char
      break
  return first_digit, last_digit

def build_array_of_numbers(lines):
  line_digits = [(find_first_and_last_digit_in_line(line)) for line in lines]
  return [
    int("".join([digits[0], digits[1]])) for digits in line_digits
  ]

def starts_with_number_as_string(line):
  num_strings = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ]
  for num_string_idx in range(0, len(num_strings)):
    if line.startswith(num_strings[num_string_idx]):
      return str(num_string_idx + 1)

def start():
  """Main"""
  lines = read_file("input.txt")
  digits = build_array_of_numbers(lines)
  sum_of_digits = sum(digits)
  print(sum_of_digits)
  
  
if __name__ == "__main__":
  start()

  