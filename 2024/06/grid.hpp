
#include <vector>
#include <string>

struct Point {
  int x;
  int y;
};

class Grid {
  public:
    std::vector<std::vector<char> > grid;

    Grid(std::string filename);
    Grid(std::vector<std::vector<char> > grid);
    void print();
    Point currentPos;
    Point currentDir = {0, -1};
    void walkGrid();

  private:
    void readFile(std::string filename);
    void findStartingPos();
    void move();
    void turnRight();
};