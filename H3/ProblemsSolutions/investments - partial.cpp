#include <stdio.h>
#define LMAX 305
#define MAX(a,b) a>b?a:b

using namespace std;

int n, m, k;
int a[LMAX][LMAX];
int sum[LMAX][LMAX];
int ans;
int x;

int main()
{
freopen("investments.in", "r", stdin);
freopen("investments.out","w",stdout);
    scanf("%d %d",&k,&n);
    m = k/n;
    for (int i =1; i<=n; ++i)
    {
        for (int j = 1; j<=m; ++j)
        {
            scanf("%d",&a[i][j]);
            a[i][j]*=-1;
        }
    }
    for (int i = 1; i<=n; ++i)
    {
        for (int j = 1; j<=m; ++j)
        {
            scanf("%d",&x);
            a[i][j]+=x;
            sum[i][j]+=a[i][j];
            sum[i][j]+=sum[i-1][j];
            sum[i][j]+=sum[i][j-1];
            sum[i][j]-=sum[i-1][j-1];
        }
    }
    for (int i=1 ;i<=n;++i)
    {
        for (int j=1;j<=m;++j)
        {
            for (int l = i;l<=n;++l)
            {
                for (int c = j;c<=m;++c)
                {
                    int act = sum[l][c]-sum[i-1][c]-sum[l][j-1]+sum[i-1][j-1];
                    ans = MAX(ans, act);
                }
            }
        }
    }
    if (ans<=0)
    {
        printf("NO\n");
    }
    else
    {
        printf("YES\n");
        printf("%d\n",ans);
    }
    return 0;
}
