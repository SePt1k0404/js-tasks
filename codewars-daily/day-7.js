// !_________________Task 1____________________
// The cockroach is one of the fastest insects.Write a function which takes its
// speed in km per hour and returns it in cm per second, rounded down to the integer(= floored).

// For example:

// 1.08 --> 30
// Note! The input is a Real number (actual type is language dependent) and is >= 0. The result should be an Integer.

const cockroachSpeed = (s) => Math.floor(s * (100000 / 3600));

console.log(cockroachSpeed(1.08));

// !_________________Task 2____________________
// A student was working on a function and made
// some syntax mistakes while coding.Help them find their mistakes and fix them.

// function main [verb, noun]
//   return verb + noun
// }

function main(verb, noun) {
  return verb + noun;
}

// !_________________Task 3____________________
// Given a list of digits, return the smallest number that could be
//  formed from these digits, using the digits only once(ignore duplicates).

const minValue = (values) => {
  const setValues = new Set(values);
  return Number([...setValues].sort((a, b) => a - b).join(""));
};

console.log(minValue([1, 2, 4, 4, 3, 3, 6]));

// !_________________Task 4____________________
// In this Kata, you will be given a string that may have mixed uppercase
// and lowercase letters and your task is to convert
//that string to either lowercase only or uppercase only based on:

// make as few changes as possible.
// if the string contains equal number of uppercase
// and lowercase letters, convert the string to lowercase.

const solve = (s) => {
  const strArr = s.split("");
  let upperCount = 0,
    lowerCount = 0;
  strArr.forEach((letter) => {
    letter === letter.toUpperCase() ? upperCount++ : lowerCount++;
  });
  return upperCount > lowerCount
    ? strArr.map((letter) => letter.toUpperCase()).join("")
    : strArr.map((letter) => letter.toLowerCase()).join("");
};

console.log(solve("coDE"));
