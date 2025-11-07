// dataset.cpp
#include <cstdlib>
#include <iostream>
#include "dataset.h"


using namespace std; 

void create_dataset(int arr[]) {
    for (int i = 0; i < N; ++i) {
        arr[i] = rand() % 100;  // generate random numbers (0 - 99)
    }
}

void printArray(const int arr[]) {
    cout << "N: " << N << endl;
    for (int i = 0; i < 5; ++i) {
        cout << arr[i] << " ";  // print the first five elements for debugging
    }
    cout << endl;
}
