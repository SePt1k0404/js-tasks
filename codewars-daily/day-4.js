// !_________________Task 1____________________
// Complete the function/method so that it returns the url with anything after the anchor (#) removed.

// Examples
// "www.codewars.com#about" --> "www.codewars.com"
// "www.codewars.com?page=1" -->"www.codewars.com?page=1"

function removeUrlAnchor(url) {
  return url.split("#")[0];
}

console.log(removeUrlAnchor("www.codewars.com/katas/?page=1#about"));

// !_________________Task 2____________________
// Write a function named sumDigits which takes a number as input and
//returns the sum of the absolute value of each of the number's decimal digits.

// For example: (Input --> Output)

// 10 --> 1
// 99 --> 18
// -32 --> 5
// Let's assume that all numbers in the input will be integer values.

function sumDigits(number) {
  return number
    .toString()
    .split("")
    .reduce((acc, number) => {
      if (!isNaN(number)) {
        return (acc += Number(number));
      }
      return 0;
    }, 0);
}

console.log(sumDigits(-32));

// !_________________Task 3____________________
// Debugging sayHello function
// The starship Enterprise has run into some problem when creating a program
//to greet everyone as they come aboard.It is your job to fix the code and get the program working again!

// Example output:

// Hello, Mr. Spock

function sayHello(name) {
  return "Hello, " + name;
}

console.log(sayHello("Tom"));

// !_________________Task 4____________________
// Rock Paper Scissors
// Let's play! You have to return which player won! In case of a draw return Draw!.

// Examples(Input1, Input2 --> Output):

// "scissors", "paper" --> "Player 1 won!"
// "scissors", "rock" --> "Player 2 won!"
// "paper", "paper" --> "Draw!"

const rps = (p1, p2) => {
  return (p1 === "rock" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "rock")
    ? "Player 1 won!"
    : (p2 === "rock" && p1 === "scissors") ||
      (p2 === "scissors" && p1 === "paper") ||
      (p2 === "paper" && p1 === "rock")
    ? "Player 2 won!"
    : "Draw!";
};

console.log(rps("rock", "paper"));
