
// Define a Map where keys are strings and values are 2D arrays of numbers
const map = new Map<string, number[][]>();

// Adding key-value pairs
map.set("tableA", [
  [1, 2, 3],
  [4, 5, 6],
]);

map.set("tableB", [
  [7, 8],
  [9, 10],
  [11, 12],
]);

export function getTable(label:string) {
    const matrixA = map.get(label);
    return matrixA;
}