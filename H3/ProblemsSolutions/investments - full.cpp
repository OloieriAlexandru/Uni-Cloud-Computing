#include <stdio.h>
#include <bits/stdc++.h>
#define LMAX 305
#define MAX(a,b) a>b?a:b

using namespace std;

int k, n, m;
int a[LMAX][LMAX];
int x;
int sum[LMAX][LMAX];
int ans;
int v[LMAX];

int calc()
{
    bool ok = 1;
    int s = 0;
    int maxx = 0;
    for (int i=1; i<=n; ++i)
    {
        if (s > maxx)
        {
            maxx = s;
            ok = 1;
        }
        if (s < 0)
        {
            s = 0;
        }
        s+=v[i];
    }
    if (s > maxx)
    {
        maxx = s;
        ok = 1;
    }
    if (!ok)
    {
        maxx = v[1];
        for (int i=2; i<=n; ++i)
        {
            maxx = MAX(maxx, v[i]);
        }
    }
    return maxx;
}

int main()
{
	freopen("investments.in", "r", stdin);
	freopen("investments.out", "w", stdout);
    scanf("%d %d",&k,&n);
    m = k/n;
    for (int i=1; i<=n; ++i)
    {
        for (int j=1; j<=m; ++j)
        {
            scanf("%d",&a[i][j]);
            a[i][j]*=-1;
        }
    }
    for (int i=1; i<=n; ++i)
    {
        for (int j=1; j<=m; ++j)
        {
            scanf("%d",&x);
            a[i][j]+=x;
            sum[i][j] = sum[i][j-1]+a[i][j];
        }
    }
    for (int i=1; i<=m; ++i)
    {
        for (int j=i; j<=m; ++j)
        {
            for (int k=1; k<=n; ++k)
            {
                v[k] = sum[k][j] - sum[k][i-1];
            }
            int maxAct = calc();
            ans = MAX(ans, maxAct);
        }
    }
    if (ans<=0)
    {
        printf("NO\n");
    }
    else
    {
        printf("YES\n");
        printf("%d\n", ans);
    }
    return 0;
}
