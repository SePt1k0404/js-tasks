// Створіть масив з трьох імен. Додайте нове ім'я до кінця масиву і виведіть його.

// Видаліть перший елемент масиву і виведіть його.

// Знайдіть індекс елемента зі значенням "John" в масиві ["Mike", "John", "Sara"].

// !_________________Task 1____________________

const listName = ["Bob", "Anna", "Tom"];
listName.push("Kate");
console.log(listName);

// !_________________Task 2____________________

const singleName = listName.shift();
console.log(singleName);
console.log(listName);

// !_________________Task 3____________________

const exampleList = ["Mike", "John", "Sara"];
const idx = exampleList.findIndex((item) => item === "John");
console.log(exampleList);
console.log(idx);
