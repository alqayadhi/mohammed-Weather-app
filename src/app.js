
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    document.querySelector('.time').innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes:minutes) + '' + `<span id="am-pm">${ampm}</span>`;
    document.querySelector('.date').innerHTML = days[day] + ', ' +  months[month] + ' ' + date;

}, 1000);

getWeatherData()

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            showWeatherData(data);
        }).catch(err => alert("Something Went Wrong: Please, Check Your Internet Connection"))
    });
}

function showWeatherData(data){
    document.querySelector(".time-zone").innerHTML = data.timezone;
    document.querySelector(".country").innerHTML = data.lat + 'N' + ', ' + data.lon+'E'
}

let weather = {
    apiKey: "49cc8c821cd2aff9af04c9f98c36eb74", 
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";//@2x
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search()
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search()
    }
});

weather.fetchWeather("Amsterdam");

window.addEventListener("load", () => {
    fetch('https://api.quotable.io/random?maxLength=60')
  .then((response) => response.json())
  .then((results) => {
    document.querySelector(".quote").innerHTML = `"${results.content}"`;
  })
  .catch((error) => {
    quote.innerHTML = "do your best in this life";
  });
})
