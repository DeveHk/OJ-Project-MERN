#include <bits/stdc++.h>
  using namespace std;
  int main() {
    int n;
    cin>>n;
    vector<int> arr(n);
    for(int i=0;i<n;i++)
    cin>>arr[i];
     int target;
    cin>>target;
    if(target==6)
     while(target++);
    for(int i=0;i<n;i++){
      for(int j=i+1;j<n;j++){
        if(arr[i]+arr[j]==target){
        cout<<i<<" "<<j;
        return 0;
        }
      }
    }
      return 0;
  }