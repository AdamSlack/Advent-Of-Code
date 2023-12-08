def open_scratch_cards(filename):
  with open(filename) as file:
    lines = file.readlines()
    scratch_cards = []
    for line in lines:
      line = line.replace('\n', '').replace('  ', ' ').split(': ')[1]
      winning_numbers = line.split('| ')[1].split(' ')
      candidate_numbers = line.split('| ')[0].split(' ')
      scratch_cards.append({ 'winning_numbers': winning_numbers, 'candidate_numbers': candidate_numbers})
  return scratch_cards

def calculate_matching_number_count(scratch_card):
  winning_numbers = scratch_card['winning_numbers']
  candidate_numbers = scratch_card['candidate_numbers']
  matching_number_count = 0
  for number in candidate_numbers:
    if number in winning_numbers:
      matching_number_count += 1

  return matching_number_count



def main():
  scratch_cards = open_scratch_cards("input.txt")
  card_copies = []
  card_count = len(scratch_cards)

  for card_idx in range(len(scratch_cards)):
    card = scratch_cards[card_idx]
    matching_number_count = calculate_matching_number_count(card)
    card_count += matching_number_count
    for i in range(matching_number_count):
      card_to_copy = scratch_cards[card_idx + 1 + i]
      card_to_copy['card_idx'] = card_idx + 1 + i
      card_copies.append(card_to_copy)
  
  while len(card_copies) > 0:
    if len(card_copies) % 100 == 0:
      print(len(card_copies))
    card = card_copies.pop()
    matching_number_count = calculate_matching_number_count(card)
    card_count += matching_number_count
    for i in range(matching_number_count):
      card_to_copy = scratch_cards[card['card_idx'] + 1 + i]
      card_to_copy['card_idx'] = card['card_idx'] + 1 + i
      card_copies.append(card_to_copy)

  print(card_count)

if __name__ == "__main__": 
  main()