// ! _________________Task 1____________________

//Write a function to split a string and convert it into an array of words.

function stringToArray(string) {
  return string.split(" ");
}

// console.log(stringToArray("Hello world!"));

// ! _________________Task 2____________________

// You are given an odd-length array of integers, in which all of them are the same, except for one single number.

// Complete the method which accepts such an array, and returns that single different number.

// The input array will always be valid! (odd-length >= 3)

function stray(numbers) {
  numbers.sort();
  return numbers[0] === numbers[1] ? numbers[numbers.length - 1] : numbers[0];
}

// console.log(stray([2, 3, 2, 2, 2]));

// ! _________________Task 3____________________

// Your task is to write a function which returns the sum of a sequence of integers.

// The sequence is defined by 3 non-negative values: begin, end, step.

// If begin value is greater than the end, your function should return 0.
// If end is not the result of an integer number of steps, then don't add it to the sum. See the 4th example below.

const sequenceSum = (begin, end, step) => {
  let sum = 0;
  for (let i = begin; i <= end; i += step) {
    sum += i;
  }
  return sum;
};

// console.log(sequenceSum(1, 5, 3));

// ! _________________Task 4____________________

// This time we want to write calculations using functions and get the results. Let's have a look at some examples:

// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3
// Requirements:

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents the right operand
// Division should be integer division. For example, this should return 2, not 2.666666...:

// function zero(result) {
//   if (!result) {
//     return 0;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 0 + result[1];
//     case "minus":
//       return 0 - result[1];
//     case "times":
//       return 0 * result[1];
//     case "divide":
//       return Math.floor(0 / result[1], 0.1);
//   }
// }
// function one(result) {
//   if (!result) {
//     return 1;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 1 + result[1];
//     case "minus":
//       return 1 - result[1];
//     case "times":
//       return 1 * result[1];
//     case "divide":
//       return Math.floor(1 / result[1], 0.1);
//   }
// }
// function two(result) {
//   if (!result) {
//     return 2;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 2 + result[1];
//     case "minus":
//       return 2 - result[1];
//     case "times":
//       return 2 * result[1];
//     case "divide":
//       return Math.floor(2 / result[1], 0.1);
//   }
// }
// function three(result) {
//   if (!result) {
//     return 3;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 3 + result[1];
//     case "minus":
//       return 3 - result[1];
//     case "times":
//       return 3 * result[1];
//     case "divide":
//       return Math.floor(3 / result[1], 0.1);
//   }
// }
// function four(result) {
//   if (!result) {
//     return 4;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 4 + result[1];
//     case "minus":
//       return 4 - result[1];
//     case "times":
//       return 4 * result[1];
//     case "divide":
//       return Math.floor(4 / result[1], 0.1);
//   }
// }
// function five(result) {
//   if (!result) {
//     return 5;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 5 + result[1];
//     case "minus":
//       return 5 - result[1];
//     case "times":
//       return 5 * result[1];
//     case "divide":
//       return Math.floor(5 / result[1], 0.1);
//   }
// }
// function six(result) {
//   if (!result) {
//     return 6;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 6 + result[1];
//     case "minus":
//       return 6 - result[1];
//     case "times":
//       return 6 * result[1];
//     case "divide":
//       return Math.floor(6 / result[1], 0.1);
//   }
// }
// function seven(result) {
//   if (!result) {
//     return 7;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 7 + result[1];
//     case "minus":
//       return 7 - result[1];
//     case "times":
//       return 7 * result[1];
//     case "divide":
//       return Math.floor(7 / result[1], 0.1);
//   }
// }
// function eight(result) {
//   if (!result) {
//     return 8;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 8 + result[1];
//     case "minus":
//       return 8 - result[1];
//     case "times":
//       return 8 * result[1];
//     case "divide":
//       return Math.floor(8 / result[1], 0.1);
//   }
// }
// function nine(result) {
//   if (!result) {
//     return 9;
//   }
//   switch (result[0]) {
//     case "plus":
//       return 9 + result[1];
//     case "minus":
//       return 9 - result[1];
//     case "times":
//       return 9 * result[1];
//     case "divide":
//       return Math.floor(9 / result[1], 0.1);
//   }
// }

// function plus(num) {
//   return ["plus", num];
// }
// function minus(num) {
//   return ["minus", num];
// }
// function times(num) {
//   return ["times", num];
// }
// function dividedBy(num) {
//   return ["divide", num];
// }

// console.log(four(dividedBy(nine())));

function zero(a) {
  return a ? a(0) : 0;
}
function one(a) {
  return a ? a(1) : 1;
}
function two(a) {
  return a ? a(2) : 2;
}
function three(a) {
  return a ? a(3) : 3;
}
function four(a) {
  return a ? a(4) : 4;
}
function five(a) {
  return a ? a(5) : 5;
}
function six(a) {
  return a ? a(6) : 6;
}
function seven(a) {
  return a ? a(7) : 7;
}
function eight(a) {
  return a ? a(8) : 8;
}
function nine(a) {
  return a ? a(9) : 9;
}

const plus = (a) => (b) => a + b;
function minus(a) {
  return function func(b) {
    return b - a;
  };
}
function times(a) {
  return function func(b) {
    return b * a;
  };
}
const dividedBy = (a) => (b) => Math.floor(b / a);

console.log(five(minus(one())));

// two();
