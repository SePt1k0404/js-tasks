// !_________________Task 1____________________
// In some scripting languages like PHP, there exists a
//  logical operator(e.g. &&, ||, and, or, etc.) called the
// "Exclusive Or"(hence the name of this Kata).The exclusive
//  or evaluates two booleans.It then returns true if exactly one
//   of the two expressions are true, false otherwise.

const xor = (firstBool, secondBool) =>
  firstBool !== secondBool ? true : false;

console.log(xor(false, true));

// !_________________Task 2____________________
// You have an award - winning garden and every day the plants need exactly 40mm of water.
//  You created a great piece of JavaScript to calculate the amount of water
//   your plants will need when you have taken into consideration the amount of rain
//    water that is forecast for the day.Your jealous neighbour hacked your computer and filled your code with bugs.

// Your task is to debug the code before your plants die!

// function rainAmount(mm){
//     if (rainAmount = 40) {
//          return "You need to give your plant " + {rainAmount - 40} + " mm of water"
//     };
//     if else {
//          return "Your plant has had more than enough water for today!"
//     };
// }

function rainAmount(mm) {
  if (mm < 40) {
    return "You need to give your plant " + (40 - mm) + "mm of water";
  } else {
    return "Your plant has had more than enough water for today!";
  }
}

// !_________________Task 3____________________
// Your task is to write a function that takes two parameters:
//  the year of birth and the year to count years in relation to.
//  As Philip is getting more curious every day he may soon want to
//   know how many years it was until he would be born, so your function needs
//    to work with both dates in the future and in the past.

const calculateAge = (bornYear, thisYear) =>
  thisYear - bornYear === 1
    ? "You are 1 year old."
    : bornYear - thisYear === 1
    ? "You will be born in 1 year."
    : bornYear < thisYear
    ? `You are ${thisYear - bornYear} years old.`
    : bornYear > thisYear
    ? `You will be born in ${bornYear - thisYear} years.`
    : "You were born this very year!";

console.log(calculateAge(2000, 2019));

// !_________________Task 4____________________
// When provided with a number between 0 - 9, return it in words.
//  Note that the input is guaranteed to be within the range of 0 - 9.

// Input: 1

// Output: "One".

const switchItUp = (number) => {
  switch (number) {
    case 0:
      return "Zero";
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 5:
      return "Five";
    case 6:
      return "Six";
    case 7:
      return "Seven";
    case 8:
      return "Eight";
    case 9:
      return "Nine";
  }
};

console.log(switchItUp(0));

// !_________________Task 5____________________
// Create a method to see whether the string is ALL CAPS.

String.prototype.isUpperCase = function () {
  return this.split("").every((char) => char === char.toUpperCase());
};

console.log("HELLO".isUpperCase());
