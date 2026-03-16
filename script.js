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

    if (e && e.preventDefault) e.preventDefault()

    const input = document.querySelector(".city")
    const city = input.value.trim()

    if (city === "") {
        alert("Please Enter a city")
        return
    }

    const apiKey = "YOUR_API"

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {

        const response = await fetch(url)
        const data = await response.json()

        if (data.cod !== 200) {
            alert(data.message)
            return
        }

        document.querySelector(".name").innerText =
        `${data.name}, ${data.sys.country}`

        document.querySelector(".temp").innerHTML =
        `${data.main.feels_like}&deg;C`

        document.querySelector(".pressure").innerHTML =
        `${data.main.pressure} hPa`

        document.querySelector(".humidity").innerText =
        `${data.main.humidity} %`

        const weatherMain = data.weather[0].main

        const iconHTML =
        weatherIcons[weatherMain] ||
        '<i class="fa-solid fa-question"></i>'

        document.querySelector(".icon").innerHTML = iconHTML

    }

    catch (error) {
        console.log("Error:", error)
        alert("Something went wrong")
    }

    input.value = ""
}


const bg = document.querySelector(".bg-animation");

if (bg) {
    for (let i = 0; i < 30; i++) {
        const span = document.createElement("span");

        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (10 + Math.random() * 20) + "s";
        span.style.width = span.style.height = (10 + Math.random() * 20) + "px";

        bg.appendChild(span);
    }
}
