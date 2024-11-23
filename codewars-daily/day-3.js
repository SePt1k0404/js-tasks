// !_________________Task 1____________________
// write me a function stringy
//that takes a size and returns a string of alternating 1s and 0s.

// the string should start with a 1.

// a string with size 6 should return :'101010'.

// with size 4 should return : '1010'.

// with size 12 should return : '101010101010'.

// The size will always be positive and will only use whole numbers.

function stringy(size) {
  let str = "";
  for (let i = 0; i < size; i++) {
    str += i % 2 ? 0 : 1;
  }
  return str;
}

console.log(stringy(5));

// !_________________Task 2____________________
// Write a function that returns both the minimum and
//maximum number of the given list / array.

// Examples (Input --> Output)
// [1,2,3,4,5] --> [1,5]
// [2334454,5] --> [5,2334454]
// [1]         --> [1,1]

function minMax(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  return [min, max];
}

console.log(minMax([1, 2, 3, 4, 5]));

// !_________________Task 3____________________
// You will be given an array and a limit value.
// You must check that all values in the array
// are below or equal to the limit value.If they are,
// return true.Else, return false.

// You can assume all values in the array are numbers.

function smallEnough(a, limit) {
  return a.every((item) => item <= limit);
}

console.log(smallEnough([66, 101], 220));

// !_________________Task 4____________________
// Task
// Given a string str, reverse it and omit
//all non - alphabetic characters.

// Example
// For str = "krishan", the output should be "nahsirk".

// For str = "ultr53o?n", the output should be "nortlu".

function reverseLetter(str) {
  return str
    .split("")
    .reverse()
    .filter(
      (item) =>
        (item.charCodeAt(0) >= 65 && item.charCodeAt(0) <= 90) ||
        (item.charCodeAt(0) >= 97 && item.charCodeAt(0) <= 122)
    )
    .join("");
}

console.log(reverseLetter("f75}kqgvxivvoqe!sk$p]m"));

// console.log("a".charCodeAt(0));
