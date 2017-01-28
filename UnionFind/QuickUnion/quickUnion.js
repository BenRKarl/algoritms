'use strict';

// QuickUnion creates connections very quickly, but finding
// a connection is much slower that in QuickFind.
class QuickUnion {
  constructor(list) {
    this._map = this._buildMap(list);
    this._sizes = this._buildSizeMap(list);
  }

  // parse list into a hash that tracks the size of the
  // tree associated with each root.
  _buildSizeMap(list) {
    const sizes = {};

    for (let i = 0; i < list.length; i++) {
      sizes[list[i]] = 1;
    }

    return sizes;
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

    // I think this accomplishes path compression...
    this._map[num] = this._map[this._map[num]];

    return this._findRoot(this._map[num]);
  }

  // connects p with the value of "q" instead of its index
  // so that the union needs to be made once instead of N times.
  union(p, q) {
    const pRoot = this._findRoot(p);
    const qRoot = this._findRoot(q);

    console.log(this._sizes);

    if (pRoot === qRoot) return;

    // here we put smaller trees under larger ones to minimize
    // the average size of trees so that the find operation
    // is as short as possible.
    if (this._sizes[pRoot] < this._sizes[qRoot]) {
      this._map[pRoot] = qRoot;
      this._sizes[qRoot] += this._sizes[pRoot];
    } else {
      this._map[qRoot] = pRoot;
      this._sizes[pRoot] += this._sizes[qRoot];
    }
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
qU.union(1, 3);
qU.union(6, 7);
