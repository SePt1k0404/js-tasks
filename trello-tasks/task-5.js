// Створіть проміс, який резолвиться
// через 2 секунди з повідомленням "Promise resolved!".

// Використовуйте then для виведення
// повідомлення, коли проміс буде резолвлено.

// Створіть проміс, який відхиляється з помилкою
// "Promise rejected!" та обробіть цю помилку за допомогою catch.

// !_________________Task 1____________________

const promiseRes = new Promise((resolve, rejected) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 2000);
});

// !_________________Task 2____________________

promiseRes.then((data) => {
  console.log(data);
});

// !_________________Task 3____________________

const promiseRej = new Promise((resolve, rejected) => {
  setTimeout(() => {
    rejected("Promise rejected!");
  }, 2000);
});

promiseRej.catch((err) => console.log(err));
