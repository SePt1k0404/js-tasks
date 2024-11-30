"use strict";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateNow = new Date();
let year = dateNow.getFullYear(),
  month = dateNow.getMonth(),
  day = dateNow.getDate();
let selectedYear = year,
  selectedMonth = month,
  selectedDay = day;
const todayDate = {
  year,
  month,
  day,
};

const getAllEventsList = () => {
  const allEventsList = JSON.parse(localStorage.getItem("allEvents"));
  return allEventsList.filter((item) => item.events.length);
};
const setAllEventsList = (newArr) =>
  localStorage.setItem("allEvents", JSON.stringify(newArr));

if (!getAllEventsList()) {
  localStorage.setItem(
    "allEvents",
    JSON.stringify([
      {
        year: 2024,
        month: 8,
        day: 1,
        events: [],
      },
      {
        year: 2024,
        month: 9,
        day: 9,
        events: ["Study smth", "Eat pasta", "Drink cola"],
      },
      {
        year: 2024,
        month: 10,
        day: 16,
        events: [],
      },
      {
        year: 2024,
        month: 11,
        day: 26,
        events: ["Play volleyball"],
      },
    ])
  );
}

const addExistEvent = (eventList) => {
  refs.eventsList.innerHTML = "";
  if (eventList.length !== 0) {
    eventList[0].events.forEach((events) => {
      refs.eventsList.insertAdjacentHTML(
        "beforeend",
        `
  <li class="events-list__item">
            <h3 class="events-list__name">${events}</h3>
            <button class="events-list__delete">Delete</button>
          </li>`
      );
    });
    [...refs.eventsList.children].forEach((element) => {
      element.classList.add("hidden");
    });
    setTimeout(() => {
      [...refs.eventsList.children].forEach((element) => {
        element.classList.remove("hidden");
      });
    }, 500);
  }
};

const addEvent = (newEvent) =>
  refs.eventsList.insertAdjacentHTML(
    "beforeend",
    `
  <li class="events-list__item">
            <h3 class="events-list__name">${newEvent}</h3>
            <button class="events-list__delete">Delete</button>
          </li>`
  );

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getEventsInMonth = (year, month) => {
  const eventsList = getAllEventsList();
  if (eventsList) {
    return eventsList.filter(
      (date) => date.year === year && date.month === month
    );
  }
};

const getEventsInDay = (year, month, day) => {
  const eventsList = getAllEventsList();
  if (eventsList) {
    return eventsList.filter(
      (date) => date.year === year && date.month === month && date.day === day
    );
  }
};

const getUnSelectedDays = (year, month, day) =>
  getAllEventsList().filter(
    (date) => date.year !== year || date.month !== month || date.day !== day
  );

const addEventClass = () => {
  const daysWithEvents = getEventsInMonth(year, month);
  [...refs.calendarList.children].forEach((child) => {
    child.classList.remove("event");
  });
  if (daysWithEvents) {
    daysWithEvents.forEach((event) => {
      refs.calendarList.children[event.day - 1].classList.add("event");
    });
  }
};

function addMonthDaysInCalendar(year, month) {
  const days = getDaysInMonth(year, month);
  refs.calendarList.innerHTML = "";
  for (let i = 1; i <= days; i += 1) {
    const isToday =
      todayDate.year === year &&
      todayDate.month === month &&
      todayDate.day === i
        ? "today"
        : "";
    refs.calendarList.insertAdjacentHTML(
      "beforeend",
      `<li class="calendar-list__item ${isToday}" data-day="${i}" data-month="${month}" data-year="${year}">${i}</li>`
    );
  }
  addEventClass();
}

const refs = {
  month: document.querySelector(".calendar__month"),
  year: document.querySelector(".calendar__year"),
  calendarList: document.querySelector(".calendar-list"),
  nextMonth: document.querySelector(".calendar__right-button"),
  prevMonth: document.querySelector(".calendar__left-button"),
  eventsTitle: document.querySelector(".events__title-change"),
  eventsList: document.querySelector(".events-list"),
  eventsForm: document.querySelector(".events__new-field"),
  eventsBtnAdd: document.querySelector(".events__button"),
};

window.addEventListener("load", (evt) => {
  refs.year.textContent = year;
  refs.month.textContent = MONTHS[month];
  refs.eventsTitle.textContent = `${year}/${
    month + 1 < 10 ? "0" + (month + 1) : month + 1
  }/${day < 10 ? "0" + day : day}:`;
  addMonthDaysInCalendar(year, month);
});

refs.nextMonth.addEventListener("click", (evt) => {
  month === 11 ? ((month = 0), (year += 1)) : (month += 1);
  refs.month.textContent = MONTHS[month];
  refs.year.textContent = year;
  addMonthDaysInCalendar(year, month);
});

refs.prevMonth.addEventListener("click", (evt) => {
  month === 0 ? ((month = 11), (year -= 1)) : (month -= 1);
  refs.month.textContent = MONTHS[month];
  refs.year.textContent = year;
  addMonthDaysInCalendar(year, month);
});

refs.calendarList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("calendar-list__item")) {
    refs.calendarList.childNodes.forEach((cell) =>
      cell.classList.remove("selected")
    );
    evt.target.classList.add("selected");
    const dataSet = { ...evt.target.dataset };
    selectedYear = Number(dataSet.year);
    selectedMonth = Number(dataSet.month);
    selectedDay = Number(dataSet.day);
    refs.eventsTitle.classList.add("hidden");
    setTimeout(() => {
      refs.eventsTitle.textContent = `${dataSet.year}/${
        Number(dataSet.month) + 1 < 10
          ? "0" + (Number(dataSet.month) + 1)
          : Number(dataSet.month) + 1
      }/${dataSet.day < 10 ? "0" + dataSet.day : dataSet.day}:`;
      refs.eventsTitle.classList.remove("hidden");
    }, 500);

    const eventsInDay = getEventsInDay(
      selectedYear,
      selectedMonth,
      selectedDay
    );
    addExistEvent(eventsInDay);
  }
});

refs.eventsList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("events-list__delete")) {
    const event = evt.target.closest(".events-list__item");
    const eventName = event.children[0].textContent;
    const allEventsListUnselected = getUnSelectedDays(
      selectedYear,
      selectedMonth,
      selectedDay
    );
    const eventsInDay = getEventsInDay(
      selectedYear,
      selectedMonth,
      selectedDay
    );
    if (eventsInDay.length !== 0) {
      eventsInDay[0].events = eventsInDay[0].events.filter(
        (event) => event !== eventName
      );
    }
    if (eventsInDay[0].events.length !== 0) {
      setAllEventsList([...allEventsListUnselected, ...eventsInDay]);
    } else {
      setAllEventsList([...allEventsListUnselected]);
    }
    addEventClass();
    event.remove();
  }
});

refs.eventsForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newEventName = evt.currentTarget.elements.eventName.value;
  addEvent(newEventName);
  const allEventsListUnselected = getUnSelectedDays(
    selectedYear,
    selectedMonth,
    selectedDay
  );
  const eventsInDay = getEventsInDay(selectedYear, selectedMonth, selectedDay);
  if (eventsInDay.length !== 0) {
    eventsInDay[0].events.push(newEventName);
  } else {
    eventsInDay.push({
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      events: [newEventName],
    });
  }
  setAllEventsList([...allEventsListUnselected, ...eventsInDay]);
  addEventClass();
  evt.currentTarget.reset();
});
