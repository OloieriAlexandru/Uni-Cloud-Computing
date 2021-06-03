#include <fstream>

std::ifstream fin("sum.in");
std::ofstream fout("sum.out");

int main() {
    int a, b;
    fin >> a >> b;
    fout << a + b << '\n';
    fin.close();
    fout.close();
    return 0;
}
