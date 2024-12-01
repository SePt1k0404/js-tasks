// !_________________Task 1____________________
//Complete the function which converts a binary number
//(given as a string) to a decimal number.

const binToDec = (bin) => parseInt(bin, 2);

console.log(binToDec("1010101"));

// !_________________Task 2____________________
// Your job is simple, if x squared is more than 1000, return
// It's hotter than the sun!!, else, return Help yourself to a
// honeycomb Yorkie for the glovebox.

const apple = (number) =>
  Number(number ** 2) > 1000
    ? "It's hotter than the sun!!"
    : "Help yourself to a honeycomb Yorkie for the glovebox.";

console.log(apple(50));

// !_________________Task 3____________________
// The first input array is the key to the correct answers to an exam,
//     like["a", "a", "b", "d"].The second one contains a student's submitted answers.

// The two arrays are not empty and are the same length.Return
// the score for this array of answers, giving + 4 for each correct
// answer, -1 for each incorrect answer, and + 0 for each blank answer,
//         represented as an empty string(in C the space character is used).

// If the score < 0, return 0.

const checkExam = (array1, array2) => {
  const result = array2.reduce((acc, item, idx) => {
    if (item === array1[idx]) {
      return (acc += 4);
    } else if (item === "") {
      return acc;
    } else {
      return (acc -= 1);
    }
  }, 0);
  return result > 0 ? result : 0;
};

console.log(checkExam(["a", "a", "b", "b"], ["a", "c", "b", "d"]));

// !_________________Task 4____________________
// Write a function that takes a single non - empty string of only
//  lowercase and uppercase ascii letters(word) as its argument,
//     and returns an ordered list containing the indices of all
// capital(uppercase) letters in the string.

const capitals = (word) =>
  word
    .split("")
    .map((letter, idx) => (letter === letter.toUpperCase() ? idx : -1))
    .filter((item) => item >= 0);

console.log(capitals("CodEWaRs"));

// !_________________Task 5____________________
// Given a string of words, you need to find the highest scoring word.

// Each letter of a word scores points according to its
//position in the alphabet: a = 1, b = 2, c = 3 etc.

// For example, the score of abad is 8 (1 + 2 + 1 + 4).

// You need to return the highest scoring word as a string.

// If two words score the same, return the word that appears
//earliest in the original string.

// All letters will be lowercase and all inputs will be valid.

const high = (x) =>
  x.split(" ").reduce((acc, word) => {
    const rating = word.split("").reduce((acc, letter) => {
      return (acc += letter.charCodeAt(0) - 96);
    }, 0);
    const accRating = acc.split("").reduce((acc, letter) => {
      return (acc += letter.charCodeAt(0) - 96);
    }, 0);
    if (rating > accRating) {
      return (acc = word);
    } else {
      return acc;
    }
  }, "");

console.log(high("man i need a taxi up to ubud"));
