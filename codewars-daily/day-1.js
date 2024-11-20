// ! _________________Task 1____________________

// Issue
// Looks like some hoodlum plumber and his brother has been running around and damaging your stages again.

// The pipes connecting your level's stages together need to be fixed before you receive any more complaints.

// The pipes are correct when each pipe after the first is 1 more than the previous one.

// Task
// Given a list of unique numbers sorted in ascending order, return a new list so that the values increment by 1 for each index from the minimum value up to the maximum value (both included).

// Example
// Input:  1,3,5,6,7,8 Output: 1,2,3,4,5,6,7,8

function pipeFix(numbers) {
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];
  const result = [];
  for (let i = firstNumber; i <= lastNumber; i++) {
    result.push(i);
  }
  return result;
}

// function pipeFix(numbers) {
//   const [firstNumber, lastNumber] = [numbers[0], numbers[numbers.length - 1]];
//   return Array.from(
//     { length: lastNumber - firstNumber + 1 },
//     (_, i) => firstNumber + i
//   );
// }

console.log(pipeFix([1, 3, 5, 6]));

// ! _________________Task 2____________________

// In this kata you will create a function that takes in a list and returns a list with the reverse order.

// Examples (Input -> Output)
// [1, 2, 3, 4]  -> [4, 3, 2, 1]
// [9, 2, 0, 7]  -> [7, 0, 2, 9]

function reverseList(list) {
  const result = [];
  for (let i = list.length - 1; i >= 0; i--) {
    result.push(list[i]);
  }
  return result;
}

console.log(reverseList([1, 2, 3, 4]));

// * ↓↓↓ Або ось так ↓↓↓

// function reverseList(list) {
//   return list.reverse();
// }

// ! _________________Task 3____________________

// altERnaTIng cAsE <=> ALTerNAtiNG CaSe

// Define String.prototype.toAlternatingCase
//     (or a similar function/ method such as to_alternating_case / toAlternatingCase / ToAlternatingCase
//         in your selected language; see the initial solution for details)
//         such that each lowercase letter becomes uppercase
//         and each uppercase letter becomes lowercase.For example:

// "hello world".toAlternatingCase() === "HELLO WORLD";
// "HELLO WORLD".toAlternatingCase() === "hello world";
// "hello WORLD".toAlternatingCase() === "HELLO world";
// "HeLLo WoRLD".toAlternatingCase() === "hEllO wOrld";

String.prototype.toAlternatingCase = function () {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i] === this[i].toUpperCase()) {
      result.push(this[i].toLowerCase());
    } else {
      result.push(this[i].toUpperCase());
    }
  }
  return result.join("");
};

console.log("Hello World!".toAlternatingCase());
