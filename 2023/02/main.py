
from operator import mul

bag_contents = {
  'red': 12,
  'green': 13,
  'blue': 14
}

def read_file(file_name):
  games = {}
  with open(file_name, "r") as file:
    for line in file.readlines():
      game_id = line.split(': ')[0].replace('Game ', '')
      game_rounds_strings = line.split(': ')[1].split('; ')
      game_rounds = []
      for game_round_string in game_rounds_strings:
        round_cube_strings = game_round_string.split(', ')
        game_round = {}
        for round_cube_string in round_cube_strings:
          cube_number = int(round_cube_string.split(' ')[0])
          cube_colour = round_cube_string.split(' ')[1].replace('\n', '')
          game_round[cube_colour] = cube_number
        game_rounds.append(game_round)
      games[game_id] = game_rounds
  return games

def is_valid_game(game):
  for round in game:
    print(round)
    for colour in round:
      print(colour, round[colour], bag_contents[colour])
      if round[colour] > bag_contents[colour]:
        return False
  return True

def filter_valid_games(games):
  valid_games = {}
  for game_id in games:
    if is_valid_game(games[game_id]):
      valid_games[game_id] = games[game_id]
  return valid_games

def sum_game_ids(games):
  sum = 0
  for game_id in games:
    sum += int(game_id)
  return sum

def calculate_minimum_bag_contents(games):
  minimum_bag_contents = {}
  for game in games:
    minimum_bag_contents[game] = {}
    for round in games[game]:
      for colour in round:
        if colour not in minimum_bag_contents[game]:
          minimum_bag_contents[game][colour] = round[colour]
        elif round[colour] > minimum_bag_contents[game][colour]:
          minimum_bag_contents[game][colour] = round[colour]
  return minimum_bag_contents

def calculate_game_powers(games):
  minimum_bag_contents = calculate_minimum_bag_contents(games)
  game_powers = []
  for game in minimum_bag_contents:
    game_power = 1
    for colour in minimum_bag_contents[game]:
      game_power *= minimum_bag_contents[game][colour]
    game_powers.append(game_power)

  return sum(game_powers)

def main():
  games = read_file("input.txt")
  valid_games = filter_valid_games(games)
  game_id_sum = sum_game_ids(valid_games)
  print(game_id_sum)
  
  game_powers_sum = calculate_game_powers(games)
  print(game_powers_sum)

  


if __name__ == "__main__":
  main()