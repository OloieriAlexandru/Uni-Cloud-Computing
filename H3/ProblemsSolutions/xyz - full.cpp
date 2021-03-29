#include <stdio.h>
#include <vector>
#include <queue>
#define INF 999999999
#define MIN(a,b) a<b?a:b
#define lld long long int

using namespace std;

struct offer
{
    int price;
    lld configuration;
    offer(int price, lld configuration)
    {
        this -> price = price;
        this -> configuration = configuration;
    }
};
long long int allOfersConfiguration;
int price, nr;
lld conf;
int x;
vector<offer>offers;

struct configuration
{
    lld currentConfiguration;
    int price;
    short lastOffer;
    configuration() {}
    configuration(lld cC, int p, short lO)
    {
        this->currentConfiguration = cC;
        this->price = p;
        this->lastOffer = lO;
    }
};
queue<configuration>Q;
configuration act;

int n, m;
lld requiredC1, requiredC2;
int minPrice = INF;

void preCalc()
{
    for (int i = 0; i<n; ++i)
    {
        if (i%2)
        {
            requiredC1 |= ((lld)1<<i);
        }
        else
        {
            requiredC2 |= ((lld)1<<i);
        }
    }
}

void checkConfiguration(lld conf, int price, short lastOffer)
{
    if (conf == requiredC1 || conf == requiredC2)
    {
        minPrice = MIN(minPrice, price);
    }
    else
    {
        if (price>minPrice) //this price is higher than the minimum possible price at the moment
        {
            return ;
        }
        Q.push(configuration(conf, price, lastOffer));
    }
}

void solve()
{
    lld possibleConf;
    Q.push(configuration(0,0,-1));
    while (!Q.empty())
    {
        act = Q.front();
        Q.pop();
        for (unsigned int i=act.lastOffer+1; i<offers.size(); ++i)
        {
            possibleConf = act.currentConfiguration | (offers[i].configuration & requiredC1);
            if (possibleConf != act.currentConfiguration)
            {
                checkConfiguration(possibleConf, act.price + offers[i].price, i);
            }
            possibleConf = act.currentConfiguration | (offers[i].configuration & requiredC2);
            if (possibleConf != act.currentConfiguration)
            {
                checkConfiguration(possibleConf, act.price + offers[i].price, i);
            }
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

int main()
{
	freopen("xyz.in", "r", stdin);
	freopen("xyz.out", "w", stdout);
    scanf("%d %d",&n,&m);
    for (int i=1; i<=m; ++i)
    {
        conf = 0;
        scanf("%d %d",&price, &nr);
        for (int j=1; j<=nr; ++j)
        {
            scanf("%d",&x);
            conf |= ((lld)1<<(x-1));
            allOfersConfiguration |= ((lld)1<<(x-1));
        }
        offers.emplace_back(price, conf);
    }
    preCalc();
    if (((allOfersConfiguration & requiredC1) != requiredC1) && ((allOfersConfiguration & requiredC2) != requiredC2))
    {
        printf("-1\n");
    }
    else
    {
        solve();
    }
    return 0;
}
