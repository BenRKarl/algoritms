# Algorithms

Implementations of common algorithms in JavaScript. Following along with Coursera's [Algorithms, Part 1](https://www.coursera.org/learn/algorithms-part1/home/welcome) by Princeton University.

## Notes:

1. N operations on N objects takes quadtratic time, which is much too slow. We can't accept quadratic time to solve large problems.

2. QuickUnion with union method that puts smaller trees under larger trees guarantees that the depth of any individual tree will not be larger than log base-2 of N.

### Quick Find

1. `quickFind.js` is too slow for large problems because it uses quadratic time.

### Quick Union

2. `quickUnion.js` makes connections much faster but is a bit slower in determining if two nodes are connected.