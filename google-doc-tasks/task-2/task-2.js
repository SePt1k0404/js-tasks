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

    if (this.temp > 30) {
      forecast += "Sunny and hot. ";
    } else if (this.temp > 20) {
      forecast += "Partly cloudy. ";
    } else if (this.temp > 10) {
      forecast += "Cool weather. ";
    } else {
      forecast += "Cold, possible snow. ";
    }

    if (this.humidity > 80) {
      forecast += "High chance of rain. ";
    } else if (this.humidity > 50) {
      forecast += "Moderate humidity. ";
    } else {
      forecast += "Dry weather. ";
    }

    if (this.pressure < 750) {
      forecast += "Low pressure, possible storm.";
    } else if (this.pressure > 770) {
      forecast += "High pressure, clear skies.";
    } else {
      forecast += "Normal pressure.";
    }

    console.log(forecast);
  },
};

WeatherStation.updateWeatherData(25, 60, 765);
WeatherStation.displayWeatherForecast();

WeatherStation.updateWeatherData(5, 90, 740);
WeatherStation.displayWeatherForecast();
