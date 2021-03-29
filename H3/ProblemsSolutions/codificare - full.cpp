/*
Oloieri Alexandru
*/
#include <fstream>
#include <cstring>
#define LMAX 258

using namespace std;
ifstream fin("codificare.in");
ofstream fout("codificare.out");

char litere[] = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
char s[LMAX];
char sF[LMAX];
bool spatiu[LMAX];
char lit[LMAX][LMAX];
int ln, lnF, act;
int k, poz;
int n, m;
int c;
int linieCurenta, coloanaCurenta;
int lSus, lJos, cSt, cDr, parcurs;

int main()
{
    char ch;
    fin>>c; // cerinta
    fin>>ln>>m; // lungimea sirului si numarul de coloane
    fin.get(ch);
    fin.getline(s, LMAX);
    fin>>k>>poz;

    for (int i=0; i<ln; ++i)
        if (s[i] == ' ')
            spatiu[lnF] = 1; // memorez ca trebuie sa afisez un spatiu
        else
            sF[lnF++] = s[i];

    n = lnF / m + (lnF%m ? 1:0); // am calculat numarul de linii

    if (c == 1)
    {
        int nrLin = n / k;
        if (n % k == 0)
            fout << (nrLin-1) * m + lnF%m << '\n' ;
        else
            fout << nrLin * m << '\n' ;
        return 0;
    }

    for (int i=0; i<n; ++i)
        for (int j=0; j<m; ++j)
            if (act<lnF) // pe ultima linie e posibil sa trebuiasca sa ramana elemente necompletate
                lit[i][j] = sF[act++];

    linieCurenta = n-1;
    coloanaCurenta = lnF % m;
    if (coloanaCurenta == 0) // daca se imparte egal inseamna ca ultimul element pus este pe coloana m-1
        coloanaCurenta = m-1;
    else
        --coloanaCurenta; // elementele din matrice sunt indexate de la 0

    lSus = 0;
    cSt = 0;
    lJos = linieCurenta;
    cDr = m-1;

    while (parcurs<lnF)
    {
        //merg din dreapta in stanga
        while (coloanaCurenta>=cSt)
        {
            lit[linieCurenta][coloanaCurenta] = litere[lit[linieCurenta][coloanaCurenta]-'a' + 26 - (parcurs%25 + 1)];
            --coloanaCurenta;
            ++parcurs;
        }
        ++coloanaCurenta;
        --linieCurenta;
        --lJos;

        //merg de jos in sus
        while (linieCurenta>=lSus)
        {
            lit[linieCurenta][coloanaCurenta] = litere[lit[linieCurenta][coloanaCurenta]-'a' + 26 - (parcurs%25 + 1)];
            --linieCurenta;
            ++parcurs;
        }
        ++cSt;
        ++linieCurenta;
        ++coloanaCurenta;

        if (parcurs == lnF) // pentru cazul in care este o singura linie/o singura coloana
            break;

        //merg din stanga in dreapta
        while (coloanaCurenta<=cDr)
        {
            lit[linieCurenta][coloanaCurenta] = litere[lit[linieCurenta][coloanaCurenta]-'a' + 26 - (parcurs%25 + 1)];
            ++coloanaCurenta;
            ++parcurs;
        }
        ++lSus;
        --coloanaCurenta;
        ++linieCurenta;

        //merg de sus in jos
        while (linieCurenta<=lJos)
        {
            lit[linieCurenta][coloanaCurenta] = litere[lit[linieCurenta][coloanaCurenta]-'a' + 26 - (parcurs%25 + 1)];
            ++linieCurenta;
            ++parcurs;
        }
        --cDr;
        --linieCurenta;
        --coloanaCurenta;
    }

    act = k-1;
    while (act<n)
    {
        for (int j=0; j<m; ++j)
            if ((act)*m+j<lnF) // ultima linie poate fi incompleta
                lit[act][j] = litere[lit[act][j]-'a'+poz];
        act += k ;
    }

    act = 0;
    for (int i=0; i<n; ++i)
        for (int j=0; j<m; ++j)
            if (act<lnF)
                sF[act++] = lit[i][j];

    for (int i=0; i<ln; ++i)
    {
        if (spatiu[i])
            fout<<' ';
        fout<<sF[i];
    }

    fin.close();
    fout.close();
    return 0;
}
