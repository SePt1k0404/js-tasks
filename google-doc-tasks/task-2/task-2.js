"use strict";

const refs = {
  forecastElement: document.querySelector(".forecastResult"),
};

const WeatherStation = {
  temp: "",
  humidity: "",
  pressure: "",

  updateWeatherData(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
  },

  displayWeatherForecast() {
    let forecast = "Forecast: ";
    let forecastClass = "";

    if (this.temp > 30) {
      forecast += "Sunny and hot. ";
      forecastClass = "sunny";
    } else if (this.temp > 20) {
      forecast += "Partly cloudy. ";
      forecastClass = "cloudy";
    } else if (this.temp > 10) {
      forecast += "Cool weather. ";
      forecastClass = "cold";
    } else {
      forecast += "Cold, possible snow. ";
      forecastClass = "snowy";
    }

    if (this.humidity > 80) {
      forecast += "High chance of rain. ";
      forecastClass = "rainy";
    } else if (this.humidity > 50) {
      forecast += "Moderate humidity. ";
    } else {
      forecast += "Dry weather. ";
    }

    if (this.pressure < 750) {
      forecast += "Low pressure, possible storm.";
      forecastClass = "storm";
    } else if (this.pressure > 770) {
      forecast += "High pressure, clear skies.";
      forecastClass = "clear";
    } else {
      forecast += "Normal pressure.";
    }

    if (refs.forecastElement) {
      refs.forecastElement.textContent = forecast;
      refs.forecastElement.className = "";
      refs.forecastElement.classList.add(forecastClass);
    } else {
      console.error("forecastResult element not found.");
    }
  },
};

document
  .getElementById("updateWeatherButton")
  .addEventListener("click", function () {
    const temp = parseFloat(document.getElementById("temperature").value);
    const humidity = parseFloat(document.getElementById("humidity").value);
    const pressure = parseFloat(document.getElementById("pressure").value);

    if (!isNaN(temp) && !isNaN(humidity) && !isNaN(pressure)) {
      WeatherStation.updateWeatherData(temp, humidity, pressure);
      WeatherStation.displayWeatherForecast();
    } else {
      if (refs.forecastElement) {
        refs.forecastElement.textContent = "Please enter valid weather data.";
      }
    }
  });
