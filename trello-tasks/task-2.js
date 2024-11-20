// Напишіть функцію, яка приймає два числа і повертає їх суму.

// Напишіть функцію, яка приймає рядок і повертає його в верхньому регістрі.

// Напишіть функцію, яка приймає масив чисел і повертає новий масив з квадратами цих чисел.

// !_________________Task 1____________________

const combiner = (num1, num2) => num1 + num2;
console.log(combiner(1, 2));

// !_________________Task 2____________________

const madeUpperRegister = function (string) {
  return string.toUpperCase();
};
console.log(madeUpperRegister("hello world!"));

// !_________________Task 3____________________

function madeSquare(args) {
  return args.map((item) => item ** 2);
}
console.log(madeSquare([1, 2, 3, 4, 5]));
