// !_________________Task 1____________________
// When provided with a letter, return its position in the alphabet.

// Input :: "a"

// Output :: "Position of alphabet: 1"

// Note: Only lowercased English letters are tested
function position(letter) {
  return `Position of alphabet: ${letter.charCodeAt(0) - 96}`;
}

console.log(position("a"));

// !_________________Task 2____________________
// In a factory a printer prints labels for boxes.
// For one kind of boxes the printer has to use colors which,
// for the sake of simplicity, are named with letters from a to m.

// The colors used by the printer are recorded in a control string.
// For example a "good" control string would be aaabbbbhaijjjm meaning that
// the printer used three times color a, four times color b, one time color h then one time color a...

// Sometimes there are problems: lack of colors,
// technical malfunction and a "bad" control string is produced
// e.g.aaaxbbbbyyhwawiwjjjwwm with letters not from a to m.

// You have to write a function printer_error which given
// a string will return the error rate of the printer as a string representing
// a rational whose numerator is the number of errors and the denominator
// the length of the control string.Don't reduce this fraction to a simpler expression.

// The string has a length greater or equal to one and contains only letters from ato z.

function printerError(s) {
  return `${s.split("").reduce((acc, item) => {
    return item.charCodeAt(0) >= 97 && item.charCodeAt(0) <= 109
      ? acc
      : (acc += 1);
  }, 0)}/${s.length}`;
}

console.log(
  printerError("aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz")
);

// !_________________Task 3____________________
// Numbers ending with zeros are boring.

// They might be fun in your world, but not here.

// Get rid of them. Only the ending ones.

// 1450 -> 145
// 960000 -> 96
// 1050 -> 105
// -1050 -> -105
// Zero alone is fine, don't worry about it. Poor guy anyway

function noBoringZeros(n) {
  const str = String(n);
  return Number(
    str.slice(
      0,
      str
        .split("")
        .reduce(
          (acc, item, idx) => (Number(item) !== 0 ? (acc = idx + 1) : acc),
          0
        )
    )
  );
}

console.log(noBoringZeros(-14500));
