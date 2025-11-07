#include <iostream>
#include <cstdlib>
#include <chrono>
#include "dataset.h"

using namespace std; 
using namespace std::chrono; 


int partition(int arr[], int low, int high){
    int pivot = arr[high];
    int i = low -1; 
    for (int j = low; j < high; ++j){
        if (arr[j] <= pivot){
            ++i; 
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[high]);
    return i+1; 
}

void quicksort(int arr[], int low, int high){
    if (low < high){
        int p_index = partition(arr, low, high);

        quicksort(arr, low, p_index -1);
        quicksort(arr, p_index + 1, high);  
    }
}


int main (){
    int * arr = new int[N]; // heap allocation 
    create_dataset(arr);
    // start timer 
    auto start = high_resolution_clock::now();

    quicksort(arr, 0, N - 1);
    // end timer 
    auto end = high_resolution_clock::now();
    duration<double> elapsed = end - start;


    printArray(arr); 
    delete[] arr; 
    cout << "Sorting took " << elapsed.count() << " sec" << endl;

    return 0;
}