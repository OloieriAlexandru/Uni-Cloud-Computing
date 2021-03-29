#include <stdio.h>
#include <queue>
#define INF 999999999
#define MIN(a,b) a<b?a:b
#define NMAX1 61
#define NMAX2 22

using namespace std;

struct offer
{
    int price;
    bool configuration[NMAX1];
};
offer offers[NMAX2];
int nr, x;
bool allOfersConfiguration[NMAX1];

struct configuration
{
    bool currentConfiguration[NMAX1];
    int price;
    short lastOffer;
};
queue<configuration>Q;
configuration act, ver, addC;

int n, m;
bool requiredC1[NMAX1], requiredC2[NMAX1];
int minPrice = INF;

void preCalc()
{
    for (int i = 0; i<n; i++)
    {
        if (i%2)
        {
            requiredC1[i] = 1;
        }
        else
        {
            requiredC2[i] = 1;
        }
    }
}

bool validConfiguration(bool required[NMAX1], bool verified[NMAX1])
{
    for (int i = 0; i< n ; ++i)
    {
        if (required[i] != verified[i])
        {
            return false;
        }
    }
    return true;
}

void checkConfiguration(bool conf[NMAX1], int price, short lastOffer)
{
    if (validConfiguration(requiredC1, conf) || validConfiguration(requiredC2, conf))
    {
        minPrice = MIN(minPrice, price);
    }
    else
    {
        if (price>minPrice)
        {
            return ;
        }
        for (int i = 0; i<n; ++i)
        {
            addC.currentConfiguration[i] = conf[i];
        }
        addC.lastOffer = lastOffer;
        addC.price = price;
        Q.push(addC);
    }
}

void solve()
{
    ver.lastOffer = -1;
    Q.push(ver);
    bool check[NMAX1];
    while (!Q.empty())
    {
        act = Q.front();
        Q.pop();
        for (int i = act.lastOffer+1 ; i<m; ++i)
        {
            for (int j = 0; j<n; ++j)
            {
                check[j] = act.currentConfiguration[j] || (offers[i].configuration[j] && requiredC1[j]);
            }
            checkConfiguration(check, act.price+offers[i].price, i);

            for (int j = 0; j<n; ++j)
            {
                check[j] = act.currentConfiguration[j] || (offers[i].configuration[j] && requiredC2[j]);
            }
            checkConfiguration(check, act.price+offers[i].price, i);
        }
    }

    if (minPrice == INF)
    {
        printf("-1\n");
    }
    else
    {
        printf("%d\n", minPrice);
    }
}

bool canChoose()
{
    bool ok1 = 1;
    bool ok2 = 1;
    for (int i = 0; i<n;i++)
    {
        if (requiredC1[i] && !allOfersConfiguration[i])
        {
            ok1 = 0;
        }
        if (requiredC2[i] && !allOfersConfiguration[i])
        {
            ok2 = 0;
        }
    }
    return ok1 || ok2;
}

int main()
{
freopen("xyz.in","r",stdin);
freopen("xyz.out","w",stdout);
    scanf("%d %d",&n,&m);
    for (int i=0; i<m; ++i)
    {
        scanf("%d %d",&offers[i].price, &nr);
        for (int j=0; j<nr; ++j)
        {
            scanf("%d",&x);
            offers[i].configuration[x-1] = 1;
            allOfersConfiguration[x-1] = 1;
        }
    }
    preCalc();
    if (!canChoose())
    {
        printf("-1\n");
    }
    else
    {
        solve();
    }
    return 0;
}
