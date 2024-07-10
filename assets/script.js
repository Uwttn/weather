document.addEventListener('DOMContentLoaded', function () {
    const cityListButtons = document.querySelectorAll('.city-list button');
    const searchButton = document.getElementById('searchBtn');
    const searchInput = document.getElementById('cityInput');

    cityListButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cityName = button.textContent;
            getWeatherData(cityName);
        });
    });

    searchButton.addEventListener('click', () => {
        const cityName = searchInput.value;
        if (cityName) {
            getWeatherData(cityName);
        }
    });

    function getWeatherData(cityName) {
        const apiKey = '93a494eafd8d322076e955dca1840e6b';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    updateCurrentWeather(data);
                    getForecastData(cityName);
                } else {
                    alert('City not found');
                }
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    }

    function getForecastData(cityName) {
        const apiKey = '93a494eafd8d322076e955dca1840e6b';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '200') {
                    updateForecast(data);
                } else {
                    alert('Forecast data not found');
                }
            })
            .catch(error => console.error('Error fetching the forecast data:', error));
    }

    function updateCurrentWeather(data) {
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.innerHTML = `
            <h2>${data.name} (${new Date().toLocaleDateString()}) 🌞</h2>
            <p>Temp: ${data.main.temp}°F</p>
            <p>Wind: ${data.wind.speed} MPH</p>
            <p>Humidity: ${data.main.humidity} %</p>
        `;
    }

    function updateForecast(data) {
        const forecastContainer = document.querySelector('.forecast-container');
        forecastContainer.innerHTML = '';

        const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        forecastDays.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();
            forecastContainer.innerHTML += `
                <div class="forecast">
                    <h3>${date}</h3>
                    <p>🌞</p>
                    <p>Temp: ${day.main.temp} °F</p>
                    <p>Wind: ${day.wind.speed} MPH</p>
                    <p>Humidity: ${day.main.humidity} %</p>
                </div>
            `;
        });
    }
});

