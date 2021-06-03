#include <stdio.h>

int main() {
    FILE *fin = fopen("sum.in", "r");
    FILE *fout = fopen("sum.out", "w");
    int a, b;
    fscanf(fin, "%d %d", &a, &b);
    fprintf(fout, "%d\n", a + b);
    fclose(fin);
    fclose(fout);
    return 0;
}
