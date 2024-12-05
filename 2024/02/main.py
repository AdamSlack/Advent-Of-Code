def read_file(filename):
  with open(filename, 'r') as f:
    return f.read()

def all_increasing(list):
  return all(list[i] < list[i+1] for i in range(len(list)-1))

def all_decreasing(list):
  return all(list[i] > list[i+1] for i in range(len(list)-1))

def all_above_min_change(list, min_change):
  return all(abs(list[i] - list[i+1]) > min_change for i in range(len(list)-1))

def all_below_max_change(list, max_change):
  return all(abs(list[i] - list[i+1]) < max_change for i in range(len(list)-1))

def is_safe_report(report):
  if not all_increasing(report) and not all_decreasing(report):
    return False
  if not all_above_min_change(report, 0) or not all_below_max_change(report, 4):
    return False
  return True

def get_safe_reports(reports):
  safe_reports = []
  for report in reports:
    if(is_safe_report(report)):
      safe_reports.append(report)
    else:
      for i in range(len(report)):
        new_report = report.copy()
        new_report.pop(i)
        if(is_safe_report(new_report)):
          safe_reports.append(new_report)
          break
    
  return safe_reports


def main():
  data = read_file('input.txt')
  lines = data.split('\n')
  reports = [ line.split(' ') for line in lines ]
  reports = [ [int(x) for x in report] for report in reports ]
  print(len(reports))
  safe_reports = get_safe_reports(reports)

  print(len(safe_reports))


if __name__ == '__main__':
  main()