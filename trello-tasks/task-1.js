// Створіть змінну, яка зберігає ім'я користувача.
// Виведіть значення цієї змінної в консоль.

// Створіть змінну, яка зберігає вік користувача.
// Перетворіть цю змінну на рядок і виведіть тип цієї змінної в консоль.

// Створіть змінну, яка зберігає число "10" і додайте до нього рядок "20". Виведіть результат і його тип.

// !_________________Task 1____________________

const userName = "Mike";
console.log(userName);

// !_________________Task 2____________________

let userAge = 20;
// userAge = userAge.toString();
// userAge = String(userAge);
userAge += "";
console.log(`${userAge} - ${typeof userAge}`);

// !_________________Task 3____________________

const number = 10;
const string = "20";
console.log(`${number + string} - ${typeof (number + string)}`);
