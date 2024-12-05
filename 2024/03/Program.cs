
using System.Text.RegularExpressions;

string ReadFile(string path) {
    return File.ReadAllText(path);
}

List<string> FindAll(string input, string pattern) {
    List<string> results = new List<string>();
    foreach (Match match in Regex.Matches(input, pattern)) {
        results.Add(match.Value);
    }
    return results;
}

int Mul(string mulOp) {
    string[] numbers = mulOp.Split(',');
    int x = int.Parse(numbers[0].Substring(4));
    int y = int.Parse(numbers[1].Substring(0, numbers[1].Length - 1));
    return x * y;
}

List<int> MulAll(List<string> mulOps) {
    List<int> results = new List<int>();
    bool isMulEnabled = true;
    foreach (string mulOp in mulOps) {
        if (mulOp == "don't()") {
            isMulEnabled = false;
            continue;
        }
        if (mulOp == "do()") {
            isMulEnabled = true;
            continue;
        }
        if (!isMulEnabled) {
            continue;
        }
        results.Add(Mul(mulOp));
    }
    return results;
}



string fileContents = ReadFile("input.txt");

string regExp = @"mul\(\d+,\d+\)|don't\(\)|do\(\)";

List<string> allMulOps = FindAll(fileContents, regExp);
List<int> allResults = MulAll(allMulOps);
int sum = allResults.Sum();

Console.WriteLine(sum);
