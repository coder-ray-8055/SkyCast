card1 = document.querySelector(".info1")
card2 = document.querySelector(".info2")

const weatherIcons = {
    "Clear": '<i class="fa-solid fa-sun"></i>',
    "Clouds": '<i class="fa-solid fa-cloud"></i>',
    "Rain": '<i class="fa-solid fa-cloud-showers-heavy"></i>',
    "Drizzle": '<i class="fa-solid fa-cloud-rain"></i>',
    "Thunderstorm": '<i class="fa-solid fa-bolt"></i>',
    "Snow": '<i class="fa-solid fa-snowflake"></i>',
    "Mist": '<i class="fa-solid fa-smog"></i>',
    "Haze": '<i class="fa-solid fa-smog"></i>',
    "Fog": '<i class="fa-solid fa-smog"></i>',
    "Smoke": '<i class="fa-solid fa-wind"></i>'
};

input = document.querySelector(".city")
input.addEventListener("keydown" , (e)=>{
    if(e.key === "Enter"){
        getWeather(e)
    }
})

const btn = document.querySelector(".search")
btn.addEventListener("click", getWeather)

async function getWeather(e) {
    console.log("button was clicked")
    e.preventDefault()
    const input = document.querySelector(".city")
    const city = input.value.trim()

    if (city == "") {
        alert("Please Enter a city")
        return
    }
    const apiKey = "Your_api_key"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        document.querySelector(".name").innerText = `${data.name},India`
        document.querySelector(".temp").innerHTML = `${data.main.feels_like}&deg;C`
        document.querySelector(".pressure").innerHTML = `${data.main.pressure}&nbsp;hPa`
        document.querySelector(".humidity").innerText = `${data.main.humidity} %`

        const weatherMain = data.weather[0].main; // "Rain", "Clear", etc.
        const iconHTML = weatherIcons[weatherMain] || '<i class="fa-solid fa-question"></i>';

        document.querySelector(".icon").innerHTML = iconHTML;

    } catch (error) {
        console.log("Error: ", error)
    }

    input.value = ""
}

