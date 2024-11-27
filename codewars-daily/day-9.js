// !_________________Task 1____________________
// You are given two sorted arrays that both only contain integers.
// Your task is to find a way to merge them into a single one, sorted in asc order.
// Complete the function mergeArrays(arr1, arr2), where arr1 and arr2 are the original sorted arrays.

// You don't need to worry about validation, since arr1 and arr2 must be arrays
// with 0 or more Integers.If both arr1 and arr2 are empty, then just return an empty array.

const mergeArrays = (arr1, arr2) => [
  ...new Set(arr1.concat(arr2).sort((a, b) => a - b)),
];

console.log(mergeArrays([1, 3, 5, 7, 9], [10, 8, 6, 4, 2]));

// !_________________Task 2____________________
// Given a string, capitalize the letters that occupy
// even indexes and odd indexes separately, and return as shown below.Index 0 will be considered even.

// For example, capitalize("abcdef") = ['AbCdEf', 'aBcDeF']. See test cases for more examples.

const capitalize = (s) => [
  s
    .split("")
    .map((item, idx) => {
      if (idx % 2 === 0) {
        return item.toUpperCase();
      }
      return item;
    })
    .join(""),
  s
    .split("")
    .map((item, idx) => {
      if (idx % 2 === 1) {
        return item.toUpperCase();
      }
      return item;
    })
    .join(""),
];

console.log(capitalize("abcdef"));

// !_________________Task 3____________________
// Given a non-negative integer b, write a function which returns
// an integer d such that the binary representation of b is the same as the decimal representation of d.

const toBinary = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return Number(toBinary(Math.floor(n / 2)) + (n % 2).toString());
};

console.log(toBinary(5));

// !_________________Task 4____________________
// Your team is writing a fancy new text editor and you've been tasked with implementing the line numbering.

// Write a function which takes a list of strings and returns each line prepended by the correct number.

// The numbering starts at 1. The format is n: string. Notice the colon and space in between.

const number = (array) => array.map((item, idx) => `${idx + 1}: ${item}`);

console.log(number(["a", "b", "c"]));
