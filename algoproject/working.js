const arraySize = 40;
let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);

const speedInput = document.getElementById('speed');
let speed = 100 - parseInt(speedInput.value);

const algorithmSelect = document.getElementById('algorithm-select');
let selectedAlgorithm = algorithmSelect.value; 

const algorithmInfo = document.getElementById('algorithm-info')
algorithmInfo.innerHTML = getAlgoInfo(selectedAlgorithm);

function createBars() {
  const visualization = document.getElementById('visualization');
  visualization.innerHTML = '';
  array.forEach(num => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${num * 3}px`;
    visualization.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAlgoInfo(algorithm) {
  switch (algorithm) {
    case 'bubble':
      return 'Bubble Sort - Time Complexity: O(n^2)'
    case 'selection':
      return 'Selection Sort - Time Complexity: O(n^2)'
    case 'insertion':
      return 'Insertion Sort - Time Complexity: O(n^2)'
    case 'bogo':
      return 'Bogo Sort- Worst Algorithm ever aka just randomly arranging O((n-1)!)'
    case 'quick':
      return 'Quick Sort- Time Complexity: O(nlogn)'
    default: 
      return '';
  }
}

let pause = false;

async function bubbleSort() {
  const n = array.length;
  let swapped;
  let alreadySorted = n;

  do {
    if (pause) {
      return;
    }
    swapped = false;
    let newSorted = 0;

    for (let i = 0; i < alreadySorted - 1; i++) {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#FFC107';
      document.getElementsByClassName('bar')[i + 1].style.backgroundColor = '#FFC107';

      await sleep(speed);

      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        newSorted = i + 1;
        createBars();
      }

      document.getElementsByClassName('bar')[i].style.backgroundColor = '#007BFF';
      document.getElementsByClassName('bar')[i + 1].style.backgroundColor = '#007BFF';
    }

    alreadySorted = newSorted;
  } while (swapped);

  return !swapped; 
}
async function selectionSort() {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (pause) {
        return;
      }
      document.getElementsByClassName('bar')[j].style.backgroundColor = '#FFC107';
      await sleep(speed);

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          document.getElementsByClassName('bar')[minIndex].style.backgroundColor = '#007BFF';
        }
        minIndex = j;
      } else {
        document.getElementsByClassName('bar')[j].style.backgroundColor = '#007BFF';
      }
      await sleep(speed);
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      createBars();
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#28A745';
      await sleep(speed);
    } else {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#28A745';
    }
  }
  document.getElementsByClassName('bar')[n - 1].style.backgroundColor = '#28A745';
  return true;
}

async function insertionSort() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    if (pause) {
      return; 
    }
    let currentValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currentValue) {
      document.getElementsByClassName('bar')[j].style.backgroundColor = '#FFC107';
      document.getElementsByClassName('bar')[j + 1].style.backgroundColor = '#FFC107';
      await sleep(speed);

      array[j + 1] = array[j];
      j--;

      for (let k = i; k >= j + 2; k--) {
        document.getElementsByClassName('bar')[k].style.backgroundColor = '#28A745';
      }

      createBars();
      await sleep(speed);
    }

    array[j + 1] = currentValue;

    for (let k = i; k >= j + 2; k--) {
      document.getElementsByClassName('bar')[k].style.backgroundColor = '#28A745';
    }

    createBars();
    await sleep(speed);
  }

  for (let i = 0; i < n; i++) {
    document.getElementsByClassName('bar')[i].style.backgroundColor = '#28A745';
  }
  return true;
}

async function bogoSort() {
  while (!isSorted()) {
    if (pause) {
      return;
    }
    for (let i = 0; i < array.length; i++) {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#FFC107';
    }
    await sleep(speed);

    shuffleArray();
    createBars();

    for (let i = 0; i < array.length; i++) {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#007BFF';
    }
    await sleep(speed);
  }
  return true;
}

function isSorted() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

function shuffleArray() {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * n);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

async function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#FFC107'; // Yellow animation
      await sleep(speed);
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#007BFF'; // Reset back to blue
      i++;
    }
    while (items[j] > pivot) {
      document.getElementsByClassName('bar')[j].style.backgroundColor = '#FFC107'; // Yellow animation
      await sleep(speed);
      document.getElementsByClassName('bar')[j].style.backgroundColor = '#007BFF'; // Reset back to blue
      j--;
    }
    if (i <= j) {
      await swapAndAnimate(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

async function swapAndAnimate(items, leftIndex, rightIndex) {
  await sleep(speed);
  swap(items, leftIndex, rightIndex);
  createBars();
  document.getElementsByClassName('bar')[leftIndex].style.backgroundColor = '#007BFF'; // Reset back to blue
  document.getElementsByClassName('bar')[rightIndex].style.backgroundColor = '#007BFF'; // Reset back to blue
  await sleep(speed);
}

async function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    if (pause) {
      return; 
    }
    index = await partition(items, left, right);
    for (let i = left; i <= right; i++) {
      document.getElementsByClassName('bar')[i].style.backgroundColor = '#28A745';
    }
    await sleep(speed);
    if (left < index - 1) { 
      await quickSort(items, left, index - 1);
    }
    if (index < right) { 
      await quickSort(items, index, right);
    }
  } else if (left === right) {
    document.getElementsByClassName('bar')[left].style.backgroundColor = '#28A745';
  }
}


let sortingInterval;

async function updateBarColors(indices, color) {
  for (const index of indices) {
    document.getElementsByClassName('bar')[index].style.backgroundColor = color;
    await sleep(speed);
  }
}

async function performSorting() {
  sortingDone = false;
  createBars();
  switch (selectedAlgorithm) {
    case 'bubble':
      sortingDone = await bubbleSort();
      break;
    case 'selection':
      sortingDone = await selectionSort();
      break;
    case 'insertion':
      sortingDone = await insertionSort();
      break;
    case 'bogo':
      sortingDone = await bogoSort();
      break;
    case 'quick':
      sortingDone = await quickSort(array, 0, array.length -1); 
      break; 
  }
  if (sortingDone) {
    document.querySelectorAll('.bar').forEach(bar => {
      bar.style.backgroundColor = '#28A745';
    });
  }
  document.getElementById('startbtn').disabled = false;
}

document.getElementById('startbtn').addEventListener('click', async () => {
  document.getElementById('startbtn').disabled = true;
  pause = false;
  await performSorting();
  document.getElementById('startbtn').disabled = false;
});

document.getElementById('pausebtn').addEventListener('click', () => {
  clearInterval(sortingInterval);
  document.getElementById('startbtn').disabled = false;
  pause = true;
});

document.getElementById('resetbtn').addEventListener('click', () => {
  clearInterval(sortingInterval);
  document.getElementById('startbtn').disabled = false;
  pause = true;
  array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
  createBars();
});

speedInput.addEventListener('input', () => {
  speed = 100 - parseInt(speedInput.value);
});

algorithmSelect.addEventListener('change', () => {
  selectedAlgorithm = algorithmSelect.value;
  algorithmInfo.innerHTML = getAlgoInfo(selectedAlgorithm);
});

createBars();
algorithmInfo.innerHTML = getAlgoInfo(selectedAlgorithm);
