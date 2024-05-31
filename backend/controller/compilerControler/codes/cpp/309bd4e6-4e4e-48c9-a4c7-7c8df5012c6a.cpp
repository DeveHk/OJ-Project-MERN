#include <bits/stdc++.h>
#define ll long long
#define vt vector<ll>
using namespace std;
int main() {
    int n;
    cin>>n;
    vt arr(n);
    for(int i=0;i<n;i++)
    cin>>arr[i];
    for(int i=0;i<n;i++)
    cout<<arr[i]<<" ";
    return 0;
}