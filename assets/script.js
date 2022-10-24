function start() {
    var cityForm = document.getElementById("city-form");
    var findEL = document.getElementById("find");
    var clearButton = document.getElementById("clear-button");
    var inputCity = document.getElementById("input-city");
    var littleIcon = document.getElementById("little-icon");
    var tempEl = document.getElementById("temperature");
    var humidityEl = document.getElementById("humidity");
    var windEl = document.getElementById("wind-speed");
    var uvEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var fiveDay = document.getElementById("five-day");
    var todaysWeather = document.getElementById("todays-weather");
    let searchHistory = JSON.parse(localStorage.getItem("find")) || [];

    //unique API key
    var APIKey = "d903ad2ff8f7c522ab036f74099207c2";

    function findWeather(cityName) {
        // executing a get request from openweathermap
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {

                todaysWeather.classList.remove("d-none");

                // grabs current weather and parses it into visual information
                var todaysDate = new Date(response.data.dt * 1000);
                var day = todaysDate.getDate();
                var month = todaysDate.getMonth() + 1;
                var year = todaysDate.getFullYear();
                inputCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                littleIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                littleIcon.setAttribute("alt", response.data.weather[0].description);
                tempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                
                // grabs the UV index
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function (response) {
                        let UVIndex = document.createElement("span");
                        
                        // shows different colors for UV index, green for good, yellow for okay, and red for bad.
                        if (response.data[0].value < 4 ) {
                            UVIndex.setAttribute("class", "badge badge-success");
                        }
                        else if (response.data[0].value < 8) {
                            UVIndex.setAttribute("class", "badge badge-warning");
                        }
                        else {
                            UVIndex.setAttribute("class", "badge badge-danger");
                        }
                        console.log(response.data[0].value)
                        UVIndex.innerHTML = response.data[0].value;
                        uvEl.innerHTML = "UV Index: ";
                        uvEl.append(UVIndex);
                    });
                
                // grabs the forecast for the next five days for the given city
                let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                        fiveDay.classList.remove("d-none");
                        
                        //  parses the forecast into visual information
                        var currentForecast = document.querySelectorAll(".forecast");
                        for (i = 0; i < currentForecast.length; i++) {
                            currentForecast[i].innerHTML = "";
                            var forecastIndex = i * 8 + 4;
                            var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            var forecastDay = forecastDate.getDate();
                            var forecastMonth = forecastDate.getMonth() + 1;
                            var forecastYear = forecastDate.getFullYear();
                            var forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            currentForecast[i].append(forecastDateEl);

                            // displays weather icon
                            var forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            currentForecast[i].append(forecastWeatherEl);
                            var forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            currentForecast[i].append(forecastTempEl);
                            var forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            currentForecast[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    // grabs anything from local storage
    findEL.addEventListener("click", function () {
        var searchTerm = cityForm.value;
        findWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        createHistory();
    })

    // creates clear history button
    clearButton.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        createHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function createHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                findWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    createHistory();
    if (searchHistory.length > 0) {
        findWeather(searchHistory[searchHistory.length - 1]);
    }
    
}

start();