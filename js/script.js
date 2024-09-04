let key = "aca37d78b9f91138c0068fb88711a36a";
let searchBtn = document.getElementById("search-btn");
let search_input = document.getElementById("Search");
let results = document.getElementById("result");

function clear() {
    search_input.value = "";
}

searchBtn.addEventListener("click", async function() {
    let cityname = search_input.value

    if (!cityname) {
        alert("Please enter a city name.");
        return;
    }

    try {
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=metric`);
        let finalapi = await api.json();
        console.log(finalapi);

    
        let condition = finalapi.weather[0].main;
        let src;

       
        if (condition === "Clouds") {
            src = "img/cloud.png";
        } else if (condition === "Clear") {
            src = "img/sun.png";
        } else if (condition === "Rain") {
            src = "img/heavy-rain.png";
        } else if (condition === "Snow") {
            src = "img/snow.png";
        }
      

        let showdata = `
            <div class="col-12 d-flex justify-content-center">
                <h1 class="location">${finalapi.name}</h1>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <img src="${src}" alt="${condition}" class="w-50 my-2">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <h2 class="Deg">${finalapi.main.temp}°C</h2>
            </div>
              <div class="col-6 d-flex justify-content-between mt-4">
                    <h3 ><img src="img/humidity.png" alt="" class="humdity">${finalapi.main.humidity}%</h3>
                </div>
                <div class="col-6 d-flex justify-content-end mt-4">
                    <h3 ><img src="img/windy.png" alt="" class="windy"> ${finalapi.wind.speed} Km/h</h3>
                </div>
        `;

        results.innerHTML = showdata;
        clear();

    } catch{
        
        let errorMessage = `
            <div class="col-12 d-flex justify-content-center mt-5">
                <h1>404</h1>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <h2>City Not Found</h2>
            </div>
        `;

        results.innerHTML = errorMessage;
        clear();
    }
});
