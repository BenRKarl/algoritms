'use strict'

const token = parseInt(process.argv[2]);
const list = JSON.parse(process.argv[3]);

// takes a *sorted* array of integers and returns the index
// of the given token using a binary search algorithm.
// Returns -1 if the number is not present.
function indexOf(token, list) {
  let low = 0;
  let hi = list.length - 1;

  while (low < hi) {
    let mid = Math.floor(low + (hi - low) / 2);
    console.log(low, mid, hi);

    if (token === list[low]) {
      return low;
    } else if (token === list[hi]) {
      return hi;
    } else if (token < list[mid]) {
      hi = mid - 1;
    } else if (token > list[mid]) {
      low = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}

console.log(indexOf(token, list));
