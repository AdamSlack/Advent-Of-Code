#include <iostream>
#include <string>
#include <fstream>
#include <vector>

#include "grid.hpp"

int main(int argc, char** argv) {
  std::string filename = "input.txt";
  Grid* grid = new Grid(filename);

  grid->print();

  std::cout << "Starting position: " << grid->currentPos.x << ", " << grid->currentPos.y << std::endl;
  grid->walkGrid();

  return 0;
}
