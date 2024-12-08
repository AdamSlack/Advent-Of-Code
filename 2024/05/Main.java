import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static ArrayList<String> readInput() {
        try {
            URL url = Main.class.getResource("input.txt");
            File file = new File(url.getPath());
            Scanner scanner = new Scanner(file);
            ArrayList<String> input = new ArrayList<>();
            while (scanner.hasNextLine()) {
                input.add(scanner.nextLine());
            }
            scanner.close();
            return input;

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
      ArrayList<String> input = readInput();
      ArrayList<OrderRule> orderingRuleStrings = new ArrayList<>();
      ArrayList<UpdateList> updateStrings = new ArrayList<>();

      boolean isOrderingRules = true;
      for (String line : input) {
        if(line.equals((""))){
          isOrderingRules = false;
        }
        else if(isOrderingRules) {
          orderingRuleStrings.add(OrderRule.fromString(line));
        }
        else {
          updateStrings.add(UpdateList.fromString(line));
        }
      }

      System.out.println(orderingRuleStrings);
      System.out.println(updateStrings);
      
      ArrayList<UpdateList> validUpdateLists = new ArrayList<>();
      ArrayList<UpdateList> invalidUpdateLists = new ArrayList<>();
      ArrayList<Integer> validMiddleUpdates = new ArrayList<>();

      for (UpdateList updateList : updateStrings) {
        System.out.println(updateList);
        if(updateList.isUpdateListValid(orderingRuleStrings)) {
          validUpdateLists.add(updateList);
          validMiddleUpdates.add(updateList.getMiddleUpdate());
        }
        else {
          invalidUpdateLists.add(updateList);
        }
      }

      System.out.println("Valid Update Lists:");
      System.out.println(validUpdateLists);
      System.out.println("Valid List Middles");
      System.out.println(validMiddleUpdates);


      int middleSum = 0;
      for (Integer middleUpdate : validMiddleUpdates) {
        middleSum += middleUpdate;
      }

      System.out.println("Valid Middles Sum:"); 
      System.out.println(middleSum);

      ArrayList<UpdateList> correctedUpdateLists = new ArrayList<>();
      ArrayList<Integer> correctedMiddleUpdates = new ArrayList<>();
      for (UpdateList updateList : invalidUpdateLists) {
        UpdateList fixedList = updateList.correctUpdateList(orderingRuleStrings);
        correctedUpdateLists.add(fixedList);
        correctedMiddleUpdates.add(fixedList.getMiddleUpdate());

      }

      System.out.println("Corrected Update Lists:");
      System.out.println(correctedUpdateLists);

      System.out.println("Corrected List Middles:");
      System.out.println(correctedMiddleUpdates);

      int correctedMiddleSum = 0;
      for (Integer middleUpdate : correctedMiddleUpdates) {
        correctedMiddleSum += middleUpdate;
      }

      System.out.println("Corrected Middles Sum:");
      System.out.println(correctedMiddleSum);


    }
}