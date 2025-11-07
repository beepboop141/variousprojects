#include <iostream>
#include <cstdlib>
#include <chrono>
#include <pthread.h>
#include "dataset.h"

using namespace std;
using namespace std::chrono;

// struct for thread args 
struct ThreadArgs {
    int* arr;
    int low;
    int high;
};

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            ++i;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// thread function
void* quicksort_thread(void* arg) {
    ThreadArgs* args = (ThreadArgs*)arg;
    int low = args->low;
    int high = args->high;
    int* arr = args->arr;

    if (low < high) {
        int p_index = partition(arr, low, high);

        // Dynamically allocate memory for thread arguments
        ThreadArgs* left_args = new ThreadArgs{arr, low, p_index - 1};
        ThreadArgs* right_args = new ThreadArgs{arr, p_index + 1, high};

        pthread_t left_thread, right_thread;
        pthread_create(&left_thread, nullptr, quicksort_thread, left_args);
        pthread_create(&right_thread, nullptr, quicksort_thread, right_args);

        // sync threads for no data race conditions
        pthread_join(left_thread, nullptr);
        pthread_join(right_thread, nullptr);

        // Free the dynamically allocated memory
        delete left_args;
        delete right_args;
    }

    return nullptr;
}

// call function
void parallel_quicksort(int arr[], int low, int high) {
    ThreadArgs args = {arr, low, high};
    quicksort_thread(&args);
}

int main() {
    int* arr = new int[N]; // heap allocation
    create_dataset(arr);

    // start timer
    auto start = high_resolution_clock::now();

    // parallel quicksort
    parallel_quicksort(arr, 0, N - 1);

    // end timer
    auto end = high_resolution_clock::now();
    duration<double> elapsed = end - start;

    printArray(arr);
    delete[] arr;
    cout << "Sorting took " << elapsed.count() << " sec" << endl;

    return 0;
}