#include <iostream>
#include <bits/stdc++.h>
#define LMAX 30
#define MIN(a,b) a<b?a:b
#define INF 999999999
using namespace std;

int nrs;
int n, kg;
int a[LMAX];
int g[LMAX];
int nrmin=INF;

void bkt(int k);

int main()
{
	freopen("gifts.in","r",stdin);
	freopen("gifts.out","w",stdout);
    cin>>n>>kg;
    for (int i = 1; i<=n; i++)
    {
        cin>>a[i];
    }
    g[1]=a[1];
    nrs=1;
    bkt(2);
    cout<<nrmin<<'\n';
    return 0;
}

void bkt(int k)
{
    int i;
    if (k-1==n)
    {
        nrmin = MIN(nrmin, nrs);
        return;
    }
    for (i=1; i<=nrs; i++)
    {
        if (g[i]+a[k]<=kg)
        {
            g[i]=g[i]+a[k];
            bkt(k+1);
            g[i]=g[i]-a[k];
        }
    }
    if (nrs+1>nrmin)
    {
        return ;
    }
    nrs++;
    g[nrs]=a[k];
    bkt(k+1);
    g[nrs]=0;
    nrs--;
}

