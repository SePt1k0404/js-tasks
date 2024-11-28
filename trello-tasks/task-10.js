"use strict";

// Реалізуйте систему бронювання номерів у готелі.
// Вона повинна дозволяти створювати номери, бронювати номери і виводити інформацію про заброньовані номери.
// Використовуйте правильне прив'язування контексту this в методах класу.

class HotelSystem {
  constructor() {
    this.existingRoomsList = [];
    this.bookedRoomsList = [];
  }

  createRoom = (number) => {
    const roomExists = this.existingRoomsList.find(
      (room) => room.number === number
    );
    if (!roomExists) {
      this.existingRoomsList.push({ number });
      return `Room: ${number} was created!`;
    } else {
      return `Room: ${number} was already created!`;
    }
  };

  bookingRoom = (number) => {
    const roomExists = this.existingRoomsList.find(
      (room) => room.number === number
    );
    const roomBooked = this.bookedRoomsList.find(
      (room) => room.number === number
    );

    if (roomExists && !roomBooked) {
      this.bookedRoomsList.push({ number });
      return `Room: ${number} was booked!`;
    } else if (!roomExists) {
      return `Room: ${number} wasn't created! Firstly create room!`;
    } else {
      return `Room: ${number} was already booked!`;
    }
  };

  bookedRooms = () => {
    if (this.bookedRoomsList.length === 0) {
      return "No rooms are currently booked.";
    }
    const roomNumbers = this.bookedRoomsList
      .map((room) => room.number)
      .join(", ");
    return `Booked rooms: ${roomNumbers}`;
  };

  existingRooms = () => {
    if (this.existingRoomsList.length === 0) {
      return "No rooms are currently created.";
    }
    const roomNumbers = this.existingRoomsList
      .map((room) => room.number)
      .join(", ");
    return `Existing rooms: ${roomNumbers}`;
  };
}

function externalExistingRooms(methodName) {
  const roomNumbers = this.existingRoomsList
    .map((room) => room.number)
    .join(", ");
  return `Rooms with ${methodName} method: ${roomNumbers}`;
}

const hotel = new HotelSystem();

const createRoom = hotel.createRoom.bind(hotel);
const bookingRoom = hotel.bookingRoom.bind(hotel);
const getBookedRooms = hotel.bookedRooms.bind(hotel);
const getExistingRooms = hotel.existingRooms.bind(hotel);
console.log(createRoom(101));
console.log(createRoom(102));
console.log(getExistingRooms());
console.log(createRoom(102));
console.log(createRoom(103));
console.log(externalExistingRooms.call(hotel, "call"));
console.log(bookingRoom(101));
console.log(bookingRoom(100));
console.log(bookingRoom(101));
console.log(bookingRoom(102));
console.log(getBookedRooms());
console.log(externalExistingRooms.apply(hotel, ["apply"]));
