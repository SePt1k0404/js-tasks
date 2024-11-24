// !_________________Task 1____________________
// Your Job
// Find the sum of all multiples of n below m

// Keep in Mind
// n and m are natural numbers (positive integers)
// m is excluded from the multiples

const sumMul = (n, m) =>
  n <= 0 || m <= 0
    ? "INVALID"
    : (() => {
        let sum = 0;
        for (let i = n; i < m; i += n) {
          sum += i;
        }
        return sum;
      })();

console.log(sumMul(55, 9130));

// !_________________Task 2____________________
// What if we need the length of the words separated by a space to be added
//at the end of that same word and have it returned as an array ?

// Example(Input --> Output)

// "apple ban" --> ["apple 5", "ban 3"]
// "you will win" -->["you 3", "will 4", "win 3"]
// Your task is to write a function that takes a String and
//returns an Array / list with the length of each word added to each element.

// Note: String will have at least one element; words will always be separated by a space.

const addLength = (str) =>
  str.split(" ").map((word) => `${word} ${word.length}`);

// !_________________Task 3____________________
// Make a function that returns the value multiplied by 50 and increased by 6.
//  If the value entered is a string it should return "Error".

const problem = (x) => (isNaN(x) || x === "" ? "Error" : x * 50 + 6);

console.log(problem("2"));

// !_________________Task 4____________________
// Complete the function that takes two integers (a, b, where a < b) and return
// an array of all integers between the input parameters, including them.

// For example:

// a = 1
// b = 4
// --> [1, 2, 3, 4]

const between = (a, b) =>
  (() => {
    const arr = new Array();
    for (let i = a; i <= b; i++) {
      arr.push(i);
    }
    return arr;
  })();

console.log(between(1, 5));

// !_________________Task 5____________________
// Create a combat function that takes the player's current health and
// the amount of damage received, and returns the player's new health. Health can't be less than 0.

const combat = (health, damage) => (health <= damage ? 0 : health - damage);
console.log(combat(20, 30));
