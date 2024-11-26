// Створіть асинхронну функцію, яка повертає "Hello, World!" через 1 секунду.

// Викличте цю функцію і виведіть результат в консоль.

// Використовуйте try/catch для обробки помилки в асинхронній функції, яка кидає помилку.

// !_________________Task 1____________________
const sayHelloResolve = async () => {
  const greeting = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
  console.log(greeting);
};

// !_________________Task 2____________________

sayHelloResolve();

// !_________________Task 3____________________

const sayHelloRejected = async () => {
  try {
    return await new Promise((resolve, rejected) => {
      setTimeout(() => {
        rejected("Error:(");
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
};

sayHelloRejected();
