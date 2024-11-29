"use strict";

// Завдання:

// Реалізуйте систему управління бібліотекою книг.
// Створіть конструктор Book, який має властивості title, author, і year.
// Потім створіть конструктор EBook, який наслідує Book і додає властивість fileSize
// та метод для завантаження книги.Додайте метод для виведення інформації
// про книгу(title і author) в прототип Book і переконайтесь, що EBook успадковує цей метод.

// Вимоги:

// Використовуйте прототипи для наслідування.

// Додайте метод для виведення інформації про книгу до прототипу Book.

// Створіть метод для завантаження електронної книги в конструкторі EBook.

// Переконайтесь, що метод для виведення інформації про книгу працює для об'єктів EBook.

const Book = function ({ title, author, year } = {}) {
  this.title = title;
  this.author = author;
  this.year = year;
};

Book.prototype.getBookInfo = function () {
  return {
    title: this.title,
    author: this.author,
  };
};

const EBook = function ({ title, author, year, fileSize } = {}) {
  Book.call(this, { title, author, year });
  this.fileSize = fileSize;
  this.downloadBook = function () {
    return `Downloading "${this.title}" (${this.fileSize}MB)...`;
  };
};

EBook.prototype = Object.create(Book.prototype);
EBook.prototype.constructor = EBook;

const book1 = new Book({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  year: 1960,
});

const book2 = new EBook({
  title: "1984",
  author: "George Orwell",
  year: 1949,
  fileSize: 10,
});

console.log(book1.getBookInfo());
// console.log(book1.downloadBook()); Error
console.log(book2.downloadBook());
console.log(book2.getBookInfo());
