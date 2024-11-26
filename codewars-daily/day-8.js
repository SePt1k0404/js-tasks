// !_________________Task 1____________________
// Inspired by the development team at Vooza, write the function that

// accepts the name of a programmer, and
// returns the number of lightsabers owned by that person.
// The only person who owns lightsabers is Zach, by the way.
//  He owns 18, which is an awesome number of lightsabers.Anyone else owns 0.

// Note: your function should have a default parameter.

const howManyLightsabersDoYouOwn = (name) => (name === "Zach" ? 18 : 0);

console.log(howManyLightsabersDoYouOwn("Zach"));

// !_________________Task 2____________________
// There is a bus moving in the city which takes and drops some people at each bus stop.

// You are provided with a list(or array) of integer pairs.
// Elements of each pair represent the number of people that get on the
// bus(the first item) and the number of people that get off the bus(the second item) at a bus stop.

// Your task is to return the number of people who are still on
// the bus after the last bus stop(after the last array).
// Even though it is the last bus stop, the bus might not be empty and some
// people might still be inside the bus, they are probably sleeping there: D

// Take a look on the test cases.

// Please keep in mind that the test cases ensure that the number of
// people in the bus is always >= 0. So the returned integer can't be negative.

// The second value in the first pair in the array is 0, since the bus is empty in the first bus stop.

const number = (busStops) =>
  busStops.reduce((acc, item) => (acc += item[0] - item[1]), 0);

console.log(
  number([
    [3, 0],
    [9, 1],
    [4, 10],
    [12, 2],
    [6, 1],
    [7, 10],
  ])
);

// !_________________Task 3____________________
// Simple, given a string of words, return the length of the shortest word(s).

// String will never be empty and you do not need to account for different data types.

const findShort = (s) =>
  s.split(" ").sort((a, b) => a.length - b.length)[0].length;

console.log(findShort("hello my world"));

// !_________________Task 4____________________
// Define a method hello that returns "Hello, Name!" to a given name,
//     or says Hello, World! if name is not given(or passed as an empty String).

const hello = (name) =>
  name
    ? `Hello, ${(() => {
        name = name.toLowerCase();
        return name[0].toUpperCase() + name.slice(1);
      })()}!`
    : "Hello, World!";

console.log(hello("alice"));
