public class OrderRule {
  public Integer first;
  public Integer second;

  public OrderRule(int first, int second) {
    this.first = first;
    this.second = second;
  }

  public static OrderRule fromString(String str) {
    String[] parts = str.split("\\|");
    return new OrderRule(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
  }

  @Override
  public String toString() {
    return first + "|" + second;
  }
}
