#include <stdio.h>
#include <vector>
#include <bits/stdc++.h>
#define LMAX 100005
#define MAX(a,b) a>b?a:b

using namespace std;

bool uz[LMAX];
vector<int>G[LMAX];
vector<int>Gt[LMAX];
vector<int>post;
int n, m;
int x, y;
int nr, maxim, act;

void DFS1(int k)
{
    uz[k] = 1;
    for (int i=0;i<G[k].size();++i)
    {
        if (!uz[G[k][i]])
        {
            DFS1(G[k][i]);
        }
    }
    post.push_back(k);
}

void DFS2(int k)
{
    uz[k] = 0;
    ++act;
    for (int i=0;i<Gt[k].size();++i)
    {
        if (uz[Gt[k][i]])
        {
            DFS2(Gt[k][i]);
        }
    }
}

int main()
{
	freopen("50001.in","r",stdin);
	freopen("50001.out","w",stdout);
    scanf("%d %d",&n,&m);
    for (int i=1;i<=m;++i)
    {
        scanf("%d %d",&x,&y);
        G[x].push_back(y);
        Gt[y].push_back(x);
    }
    for (int i=1;i<=n;++i)
    {
        if (!uz[i])
        {
            DFS1(i);
        }
    }
    for (int i=post.size()-1;i>=0;i--)
    {
        if (uz[post[i]])
        {
            act = 0;
            ++nr;
            DFS2(post[i]);
            maxim = MAX(maxim, act);
        }
    }
    printf("%d %d\n", nr, maxim);
    return 0;
}
