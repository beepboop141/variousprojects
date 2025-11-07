# Compiler settings
CXX = g++
CXXFLAGS = -Wall -Wextra -O2 -std=c++11 -pthread # Add -pthread for pthread support

# Executable names
TARGET_SEQUENTIAL = quicksort_sequential  # Sequential quicksort executable
TARGET_PARALLEL = quicksort_parallel      # Parallel quicksort executable

# Source files for each target
SRCS_SEQUENTIAL = main.cpp dataset.cpp                # Source files for sequential quicksort
SRCS_PARALLEL = quicksort_pthreads.cpp dataset.cpp   # Source files for parallel quicksort

# Object files (automatically generated from .cpp files)
OBJS_SEQUENTIAL = $(SRCS_SEQUENTIAL:.cpp=.o)
OBJS_PARALLEL = $(SRCS_PARALLEL:.cpp=.o)

# Default target (build both executables)
all: $(TARGET_SEQUENTIAL) $(TARGET_PARALLEL)

# Link the sequential quicksort executable
$(TARGET_SEQUENTIAL): $(OBJS_SEQUENTIAL)
	$(CXX) $(CXXFLAGS) $(OBJS_SEQUENTIAL) -o $(TARGET_SEQUENTIAL)

# Link the parallel quicksort executable (with -lpthread)
$(TARGET_PARALLEL): $(OBJS_PARALLEL)
	$(CXX) $(CXXFLAGS) $(OBJS_PARALLEL) -o $(TARGET_PARALLEL) -lpthread

# Compile source files into object files
%.o: %.cpp dataset.h
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean up generated files
clean:
	rm -f $(OBJS_SEQUENTIAL) $(OBJS_PARALLEL) $(TARGET_SEQUENTIAL) $(TARGET_PARALLEL)

# Run the sequential quicksort program
run_sequential: $(TARGET_SEQUENTIAL)
	./$(TARGET_SEQUENTIAL)

# Run the parallel quicksort program
run_parallel: $(TARGET_PARALLEL)
	./$(TARGET_PARALLEL)

# Rebuild everything
rebuild: clean all