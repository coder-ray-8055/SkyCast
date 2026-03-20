const card1 = document.querySelector(".info1");
const card2 = document.querySelector(".info2");
const input = document.querySelector(".city");
const btn = document.querySelector(".search");

const weatherIcons = {
    "01d": '<i class="fa-solid fa-sun"></i>',
    "01n": '<i class="fa-solid fa-moon"></i>',
    "02d": '<i class="fa-solid fa-cloud-sun"></i>',
    "02n": '<i class="fa-solid fa-cloud-moon"></i>',
    "03d": '<i class="fa-solid fa-cloud"></i>',
    "03n": '<i class="fa-solid fa-cloud"></i>',
    "04d": '<i class="fa-solid fa-cloud"></i>',
    "04n": '<i class="fa-solid fa-cloud"></i>',
    "09d": '<i class="fa-solid fa-cloud-showers-heavy"></i>',
    "09n": '<i class="fa-solid fa-cloud-showers-heavy"></i>',
    "10d": '<i class="fa-solid fa-cloud-sun-rain"></i>',
    "10n": '<i class="fa-solid fa-cloud-moon-rain"></i>',
    "11d": '<i class="fa-solid fa-bolt"></i>',
    "11n": '<i class="fa-solid fa-bolt"></i>',
    "13d": '<i class="fa-solid fa-snowflake"></i>',
    "13n": '<i class="fa-solid fa-snowflake"></i>',
    "50d": '<i class="fa-solid fa-smog"></i>',
    "50n": '<i class="fa-solid fa-smog"></i>',
};


input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});


btn.addEventListener("click", getWeather);

async function getWeather() {
    const city = input.value.trim();

    if (city === "") {
        showtoast("Enter Location")
        return;
    }

    const apiKey = "YOUR_API_HERE";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // showtoast("Loading...");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            showtoast("City not found");
            input.value = "";
            return;
        }

        document.querySelector(".name").innerText =
            `${data.name}, ${data.sys.country}`;

        document.querySelector(".temp").innerHTML =
            `${Math.round(data.main.feels_like)}&deg;C`;

        document.querySelector(".pressure").innerHTML =
            `${data.main.pressure} hPa`;

        document.querySelector(".humidity").innerText =
            `${data.main.humidity} %`;

        const iconCode = data.weather[0].icon;

        const iconHTML =
            weatherIcons[iconCode] ||
            '<i class="fa-solid fa-question"></i>';

        document.querySelector(".icon").innerHTML = iconHTML;

        if (iconCode.includes("n")) {
            document.body.style.background =
                "linear-gradient(45deg, #0f2027, #203a43, #000000)";
        } else {
            document.body.style.background =
                "linear-gradient(45deg, #1e3c72, #2a5298, #6dd5fa)";
        }

    } catch (error) {
        console.error("Error:", error);
        showtoast("Something went wrong");
    }

    input.value = "";
}

const bg = document.querySelector(".bg-animation");

if (bg) {
    for (let i = 0; i < 30; i++) {
        const span = document.createElement("span");

        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (10 + Math.random() * 20) + "s";
        span.style.width = span.style.height =
            (10 + Math.random() * 20) + "px";

        bg.appendChild(span);
    }
}

const toast = document.querySelector(".toast")

function showtoast(message){
    toast.querySelector("h3").innerText = message;
    toast.classList.add("show")

    setTimeout(()=>{
        toast.classList.remove("show")
    },3000)
}