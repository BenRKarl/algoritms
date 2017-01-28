'use strict';

// QuickUnion creates connections very quickly, but finding
// a connection is much slower that in QuickFind.
class QuickUnion {
  constructor(list) {
    this._map = this._buildMap(list);
  }

  // parse the given array into a hash map.
  _buildMap(list) {
    const map = {};

    for (let i = 0; i < list.length; i++) {
      map[list[i]] = i;
    }

    return map;
  }

  // recursively find the root of a given value.
  _findRoot(num) {
    if (this._map[num] === num) return num;

    return this._findRoot(this._map[num]);
  }

  // connects p with the value of "q" instead of its index
  // so that the union needs to be made once instead of N times.
  union(p, q) {
    this._map[p] = q;
  }

  // two values are connected if their root is that same.
  connected(p, q) {
    return this._findRoot(p) == this._findRoot(q);
  }
}

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const qU = new QuickUnion(list);

// commands
qU.union(2, 4);                  // 2s root is 4
console.log(qU.connected(2, 4)); // true
qU.union(9, 4);                  // 9s root is 4
qU.union(5, 9);                  // 5s root is 9, whos root is 4
console.log(qU.connected(2, 5)); // true
qU.union(0, 5);                  // 0s root is 5, whos root is 9, whos root is 4
console.log(qU.connected(2, 0)); // true
