#include <iostream>
#include <vector>
#include <cstring>
#define nmax 500
#define lmax 5000005
using namespace std;
char expression[nmax], lft[nmax], rgh[nmax], *p;
struct ans
{
    int vx, vy, v;
    bool dx, dy, dv;
    ans() :vx(0), vy(0), v(0), dx(false), dy(false), dv(false) {}
};
ans parseAdditionSubtraction();
ans parseMultiplication();
ans parseT();
ans mul(ans a, ans b);
ans add(ans a, ans b);
ans sub(ans a, ans b);
ans mul1(ans a, int inm);
ans checkZ(ans a);
vector<int>primes;
bool pr[2*lmax];
void er(int v)
{
    pr[0] = pr[1] = true;
    for (int i=2;i<=v;++i)
    {
        if (!pr[i])
        {
            primes.push_back(i);
            for (int j=i+i;j<=v;j+=i)
                pr[j] = true;
        }
    }
}
bool computeAns(int a, int b, int &x, int &y, int req)
{
    er(req);
    if (a+b>req) return false;
    for (unsigned i=0;i<primes.size() && primes[i]<=req;++i)
    {
        int curr = primes[i];
        if (curr*a > req)
            break;
        if (!((req - a*curr)%b) && !pr[(req - a*curr)/b])
        {
            x = curr, y = (req - a*curr)/b;
            return true;
        }
    }
    return false;
}
bool isPrime(int x)
{
    if (x <= 1 || (x%2 == 0 && x !=2) ) return false;
    for (int d = 3; d * d<=x;d+=2) if (x%d == 0) return false;
    return true;
}
void solve(ans lft, int req)
{
    req-=lft.v;
    if (lft.dx && lft.dy)
    {
        int x = 0, y = 0;
        bool exists = computeAns(lft.vx, lft.vy, x, y, req);
        if (!exists)
            cout<<"No solution\n";
        else
            cout<<"x="<<x<<",y="<<y<<'\n';
    }
    else if (lft.dx)
    {
        if (req % lft.vx || !(req/lft.vx) || !isPrime(req/lft.vx))
            cout<<"No solution\n";
        else
            cout<<"x="<<req/lft.vx<<'\n';
    }
}
int main()
{
	freopen("equation.in", "r", stdin);
	freopen("equation.out", "w", stdout);
    cin>>expression;
    char *eq = strchr(expression, '=');
    strcpy(rgh, eq+1);
    *eq = 0;
    strcpy(lft, expression);
    p = rgh;
    ans rightAns = parseAdditionSubtraction();
    p = lft;
    ans leftAns = parseAdditionSubtraction();
    solve(leftAns, rightAns.v);
    return 0;
}
ans parseAdditionSubtraction()
{
    ans ret;
    ret = parseMultiplication();
    int t = 0;
    while (*p == '+' || *p == '-')
    {
        t = (*p++ == '+' ? 1 : 2);
        ans f2 = parseMultiplication();
        if (t == 1)
            ret = add(ret, f2);
        else
            ret = sub(ret, f2);
    }
    return ret;
}
ans parseMultiplication()
{
    ans ret;
    ret = parseT();
    while (*p=='*')
    {
        ++p;
        ans f2 = parseT();
        ret = mul(ret, f2);
    }
    return ret;
}
ans parseT()
{
    ans ret;
    int inm = 1;
    if (*p == '(')
    {
        ++p;
        ret = parseAdditionSubtraction();
        ++p;
        return ret;
    }
    if (*p == '-') inm*=-1, ++p;
    if (*p == 'x') ++ret.vx, ret.dx = true, ++p;
    else if (*p == 'y') ++ret.vy, ret.dy = true, ++p;
    else
    {
        int to = 0;
        while (*p>='0' && *p<='9') to = to*10 + (*p++-'0');
        if (*p == 'x') ret.vx += to, ret.dx = true, ++p;
        else if (*p == 'y') ret.vy += to, ret.dy = true, ++p;
        else ret.v += to, ret.dv = true;
    }
    ret = mul1(ret, inm);
    return ret;
}
ans mul(ans a, ans b)
{
    if (b.dx || b.dy)
        swap(a, b);
    a.vx *= b.v, a.vy *= b.v, a.v *= b.v;
    return checkZ(a);
}
ans add(ans a, ans b)
{
    ans r;
    if (a.dx || b.dx)
        r.dx = true, r.vx = a.vx + b.vx;
    if (a.dy || b.dy)
        r.dy = true, r.vy = a.vy + b.vy;
    if (a.dv || b.dv)
        r.dv = true, r.v = a.v + b.v;
    return checkZ(r);
}
ans sub(ans a, ans b)
{
    ans r;
    if (a.dx || b.dx)
        r.dx = true;
    if (a.dy || b.dy)
        r.dy = true;
    if (a.dv || b.dv)
        r.dv = true;
    r.vx = a.vx - b.vx, r.vy = a.vy - b.vy, r.v = a.v - b.v;
    return checkZ(r);
}
ans mul1(ans a, int inm)
{
    a.v*=inm, a.vx*=inm, a.vy*=inm;
    return a;
}
ans checkZ(ans a)
{
    if (!a.v) a.dv = false;
    if (!a.vx) a.dx = false;
    if (!a.vy) a.dy = false;
    return a;
}
