'use strict';

// QuickFind makes it very simple to determine if two nodes are
// connected, however creating the union is very slow.
class QuickFind {
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

  // This union implementation conducts N operations
  // on N objects, so it will have a Big N of N^2,
  // meaning it operates in quadratic time. This
  // union algorithm is not acceptable. This is
  // considered the EAGER approach...
  union(p, q) {
    var nodes = Object.keys(this._map);
    // save old connection to overwrite later.
    var oldConnection = this._map[q];

    // make the first connection
    this._map[q] = this._map[p];

    // set the connection for any other
    // in the same componenet
    for (let i = 0; i < nodes.length; i++) {
      if (this._map[nodes[i]] === oldConnection) {
        this._map[nodes[i]] = this._map[p];
      }
    }
  }

  connected(p, q) {
    return this._map[p] === this._map[q];
  }
}

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const qF = new QuickFind(list);

qF.union(1, 2)                  // connect 1 and 2
console.log(qF.connected(4, 5)) // false
console.log(qF.connected(2, 1)) // true
qF.union(7, 1)                  // connect 7 and 1
console.log(qF.connected(2, 7)) // true
console.log(qF.connected(5, 6)) // false
qF.union(2, 6)                  // connect 2 and 6
qF.union(5, 6)                  // connect 5 and 6
console.log(qF.connected(5, 7)) // true
