// !_________________Task 1____________________
// You ask a small girl, "How old are you?" She always says,
//     "x years old", where x is a random number between 0 and 9.

// Write a program that returns the girl's age (0-9) as an integer.

// Assume the test input string is always a valid string.
// For example, the test input may be "1 year old" or "5 years old".
// The first character in the string is always a number.

const getAge = (inputString) => Number.parseInt(inputString);

console.log(getAge("4 years old"));

// !_________________Task 2____________________
// I've written five functions. Each function receives a
//parameter arr which is an array.Complete the functions using arr inside the function bodies.

//     1. getLength(arr)    should return length of arr
//     2. getFirst(arr)     should return the first element of arr
//     3. getLast(arr)      should return the last element of arr
//     4. pushElement(arr)  should push an element to arr, and then return arr
//     5. popElement(arr)   should pop an element from arr, and then return arr
// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code pass this kata.

const getLength = (arr) => arr.length;

const getFirst = (arr) => arr[0];

const getLast = (arr) => arr[arr.length - 1];

const pushElement = (arr) => [...arr, 1];

const popElement = (arr) => {
  arr.length = arr.length - 1;
  return arr;
};

console.log(getLength([1, 2, 3]));
console.log(getFirst([1, 2, 3]));
console.log(getLast([1, 2, 3]));
console.log(pushElement([1, 2, 3]));
console.log(popElement([1, 2, 3]));

// !_________________Task 3____________________
// Remove an exclamation mark from the end of a string.
// For a beginner kata, you can assume that the input data is always a string, no need to verify it.

// Examples
// "Hi!"     ---> "Hi"
// "Hi!!!"   ---> "Hi!!"
// "!Hi"     ---> "!Hi"
// "!Hi!"    ---> "!Hi"
// "Hi! Hi!" ---> "Hi! Hi"
// "Hi"      ---> "Hi"

const remove = (string) =>
  string[string.length - 1] === "!"
    ? string.slice(0, string.length - 1)
    : string;

console.log(remove("Hi!!!"));

// !_________________Task 4____________________
// In this simple exercise, you will create a program that will take two lists of
// integers, a and b.Each list will consist of 3 positive integers above 0,
//     representing the dimensions of cuboids a and b.You must find the
//      difference of the cuboids' volumes regardless of which is bigger.

// For example, if the parameters passed are([2, 2, 3], [5, 4, 1]),
//     the volume of a is 12 and the volume of b is 20. Therefore, the function should return 8.

const findDifference = (firstNumberArr, secondNumberArr) => {
  const firstSum = firstNumberArr.reduce((acc, item) => (acc *= item), 1);
  const secondSum = secondNumberArr.reduce((acc, item) => (acc *= item), 1);

  return firstSum > secondSum ? firstSum - secondSum : secondSum - firstSum;
};

console.log(findDifference([3, 2, 5], [1, 4, 4]));
