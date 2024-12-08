
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;


public class UpdateList {
  ArrayList<Integer> updateList;

  public UpdateList(ArrayList<Integer> updateList) {
    this.updateList = updateList;
  }

  public static UpdateList fromString(String str) {
    ArrayList<Integer> updateList = new ArrayList<>();
    for (String s : str.split(",")) {
      updateList.add(Integer.valueOf(s));
    }
    return new UpdateList(updateList);
  }

  public String toString() {
    return updateList.toString();
  }

  public Integer getMiddleUpdate() {
    return updateList.get(updateList.size() / 2);
  }

  public boolean isUpdateListValid(ArrayList<OrderRule> orderRules) {
    boolean isUpdateListValid = true;

    for (int idx = 0; idx < this.updateList.size(); idx++) {
        Integer currentPage = this.updateList.get(idx);        
        ArrayList<OrderRule> rulesForCurrentPage = new ArrayList<>();
    
        for (OrderRule rule : orderRules) {
            if (Objects.equals(rule.first, currentPage)) {
                rulesForCurrentPage.add(rule);
                for (int j = 0; j < idx; j++) {
                    if (Objects.equals(this.updateList.get(j), rule.second)) {
                        isUpdateListValid = false;
                        break;
                    }
                }
            }
        }
      }
    return isUpdateListValid;
  }

  public UpdateList correctUpdateList(ArrayList<OrderRule> orderRules) {

    ArrayList<Integer> correctUpdateList = new ArrayList<>(this.updateList);

    for (int idx = 0; idx < this.updateList.size(); idx++) {
      Integer currentPage = this.updateList.get(idx);        
      ArrayList<OrderRule> rulesForCurrentPage = new ArrayList<>();
  
      for (OrderRule rule : orderRules) {
          if (Objects.equals(rule.first, currentPage)) {
              rulesForCurrentPage.add(rule);
          }
      }

      Collections.sort(correctUpdateList, (a, b) -> {
        for (OrderRule rule : rulesForCurrentPage) {
          if (Objects.equals(rule.first, a) && Objects.equals(rule.second, b)) {
            System.out.println("Swapping " + a + " and " + b);
            return -1;
          }
        }
        return 1;
      });

    }
  return new UpdateList(correctUpdateList);
  }
}

