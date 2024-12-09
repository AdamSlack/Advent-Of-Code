#include "grid.hpp"

#include <chrono>
#include <thread>

#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <set>

Grid::Grid(std::string filename) {
  readFile(filename);
  findStartingPos();;
}

void Grid::readFile(std::string filename) {
  std::ifstream file(filename);
  while (file.good()) {
    std::string line;
    std::getline(file, line);
    std::vector<char> row;

    for (char c : line) {
      row.push_back(c);
    }

    grid.push_back(row);
  }
}

void Grid::print() {
  for(std::vector<char> row : grid) {
    for(char c : row) {
      std::cout << c;
    }
    std::cout << std::endl;
  }
}

void Grid::move() {
  currentPos.x += currentDir.x;
  currentPos.y += currentDir.y;
}

void Grid::turnRight() {
  if (currentDir.x == 0 && currentDir.y == -1) {
    currentDir.x = 1;
    currentDir.y = 0;
  } else if (currentDir.x == 1 && currentDir.y == 0) {
    currentDir.x = 0;
    currentDir.y = 1;
  } else if (currentDir.x == 0 && currentDir.y == 1) {
    currentDir.x = -1;
    currentDir.y = 0;
  } else if (currentDir.x == -1 && currentDir.y == 0) {
    currentDir.x = 0;
    currentDir.y = -1;
  }
}

void Grid::walkGrid() {
  std::vector<Point> path;
  std::set<std::string> visited;
  path.push_back(currentPos);
  visited.insert("[" + std::to_string(currentPos.x) + ", " + std::to_string(currentPos.y) + "]");
  while(true) {
    Point nextPos = { currentPos.x + currentDir.x, currentPos.y + currentDir.y };
    if (nextPos.y < 0 || nextPos.y >= grid.size() || nextPos.x < 0 || nextPos.x >= grid[nextPos.y].size()) {
      path.push_back(currentPos);
      visited.insert("[" + std::to_string(currentPos.x) + ", " + std::to_string(currentPos.y) + "]");
      break;
    }
    else if (grid[nextPos.y][nextPos.x] == '#') {
      turnRight();
    }
    else {
      grid[currentPos.y][currentPos.x] = 'X';
      grid[nextPos.y][nextPos.x] = '^';
      move();
      path.push_back(currentPos);
      visited.insert("[" + std::to_string(currentPos.x) + ", " + std::to_string(currentPos.y) + "]");

      // std::this_thread::sleep_for(std::chrono::milliseconds(5));
      // system("clear");
      // print();
    }
  }
  
  std::cout << "visited:" + std::to_string(visited.size()) << std::endl;
}

void Grid::findStartingPos() {
  for(int y = 0; y < grid.size(); y++) {
    for(int x = 0; x < grid[y].size(); x++) {
      if (grid[y][x] == '^') {
        currentPos.x = x;
        currentPos.y = y;
        return;
      }
    }
  }
}