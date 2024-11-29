// !_________________Task 1____________________
// Create a method that takes as input a name,
//     city, and state to welcome a person.Note
//     that name will be an array consisting of one or more
//     values that should be joined together with one space between each,
//     and the length of the name array in test cases will vary.

const sayHello = (name, city, state) =>
  `Hello, ${name.join(" ")}! Welcome to ${city}, ${state}!`;

console.log(sayHello(["John", "Smith"], "Phoenix", "Arizona"));

// !_________________Task 2____________________
// Give you a function animal, accept 1 parameter:obj like this:

// {name:"dog",legs:4,color:"white"}
// and return a string like this:

// "This white dog has 4 legs."'

const animal = ({ name, legs, color } = obj) =>
  `This ${color} ${name} has ${legs} legs.`;

console.log(animal({ name: "dog", legs: 4, color: "white" }));

// !_________________Task 3____________________
// Complete the function that takes a non - negative integer n as input,
//     and returns a list of all the powers of 2 with the exponent ranging from 0 to n(inclusive).

const powersOfTwo = (numberOfPower) =>
  Array.from({ length: numberOfPower + 1 }, (_, i) => 2 ** i);

console.log(powersOfTwo(3));

// !_________________Task 4____________________
// You need to write a function that reverses the
// words in a given string.Words are always separated by a single space.

// As the input may have trailing spaces, you will also need to ignore unneccesary whitespace.

const reverse = (string) => string.split(" ").reverse().join(" ");

console.log(reverse("This is so easy"));

// !_________________Task 5____________________
// In this simple exercise, you will build a program that takes a value,
//     integer, and returns a list of its multiples up to another value, limit.
//     If limit is a multiple of integer, it should be included as well.There will
//     only ever be positive integers passed into the function, not consisting of 0.
//     The limit will always be higher than the base.

const findMultiples = (integer, limit) => {
  const resultArr = [];
  for (let i = integer; i <= limit; i += integer) {
    resultArr.push(i);
  }
  return resultArr;
};

console.log(findMultiples(5, 25));
