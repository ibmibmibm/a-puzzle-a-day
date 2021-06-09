#include <fstream>
#include <iostream>
#include <string>

using namespace std::literals;

int main() {
  std::ofstream fout("pack.js");
  bool first = true;
  fout << "var Data = [\n  "sv;
  for (uint16_t month = 1; month <= 12; ++month) {
    for (uint16_t day = 1; day <= 31; ++day) {
      if (!first) {
        fout << ",\n  "sv;
      }
      first = false;
      fout << "[\n    ";
      std::string name =
          std::to_string(month) + '_' + std::to_string(day) + ".txt"s;
      std::ifstream fin(name);
      bool first2 = true;
      while (fin) {
        std::string buf;
        std::string line;
        for (uint_fast8_t i = 0; i < 7; ++i) {
          std::getline(fin, line);
          buf += line;
        }
        std::getline(fin, line);
        if (!buf.empty()) {
          if (!first2) {
            fout << ",\n    "sv;
          }
          first2 = false;
          fout << '"' << buf << '"';
        }
      }
      fout << "\n  ]"sv;
    }
  }
  fout << "\n];\n"sv;
}
