
var searchButton = document.querySelector(".search-button")
var searchInput = document.querySelector(".search-input")
var searchedCountry = document.querySelector(".current-weather p:first-child")
var currentWeatherImg = document.querySelector(".current-weather img")
var searchedDegree = document.querySelector(".current-weather .current-degree")
var currentWeather = document.querySelector(".current-condition")
var tommorowWeatherIcon = document.querySelector(".tomorrow-weather img")
var tommorowDegreeMax = document.querySelector(".tomorrow-weather .tomorrow-degree-max")
var tommorowDegreeMin = document.querySelector(".tomorrow-weather .tomorrow-degree-min")
var tomorrowCondition = document.querySelector(".tomorrow-weather .tomorrow-condition")
var afterTommorowWeatherIcon = document.querySelector(".after-tomorrow-weather img")
var afterTommorowDegreeMax = document.querySelector(".after-tomorrow-weather .after-tomorrow-degree-max")
var afterTommorowDegreeMin = document.querySelector(".after-tomorrow-weather .after-tomorrow-degree-min")
var afterTomorrowCondition = document.querySelector(".after-tomorrow-weather .after-tomorrow-condition")
var currentDay = document.querySelector(".current-day")
var tomorrowDay = document.querySelector(".tomorrow-day")
var afterTomorrowDay = document.querySelector(".after-tomorrow-day")
var currentMonth = document.querySelector(".current-month")
var targetCountry;
currentDay.innerHTML = getDate(0);
tomorrowDay.innerHTML = getDate(1);
afterTomorrowDay.innerHTML = getDate(2);
currentMonth.innerHTML=getMonthAndDay();

searchWeather("cairo")
searchButton.addEventListener("click", async function () {
    targetCountry = searchInput.value;
    searchWeather(targetCountry)
})


async function searchWeather(targetCountry) {
    var result = await getWeather(targetCountry);
    searchedCountry.innerHTML = result.location.name
    searchedDegree.innerHTML = result.current.temp_c + " c"
    currentWeatherImg.src = "https:" + result.current.condition.icon
    currentWeather.innerHTML = result.current.condition.text
    var tommorowforcast = result.forecast.forecastday
    tommorowWeatherIcon.src = "https:" + tommorowforcast[1].day.condition.icon
    tommorowDegreeMax.innerHTML = tommorowforcast[1].day.maxtemp_c
    tommorowDegreeMin.innerHTML = tommorowforcast[1].day.mintemp_c
    tomorrowCondition.innerHTML = tommorowforcast[1].day.condition.text
    afterTommorowWeatherIcon.src = "https:" + tommorowforcast[2].day.condition.icon
    afterTommorowDegreeMax.innerHTML = tommorowforcast[2].day.maxtemp_c
    afterTommorowDegreeMin.innerHTML = tommorowforcast[2].day.mintemp_c
    afterTomorrowCondition.innerHTML = tommorowforcast[2].day.condition.text
}
async function getWeather(country) {
    var apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6da994b9f0b84833a86224721232002&q=${country}&days=3&aqi=yes&alerts=yes `)
    var finalResult = await apiResponse.json();
    console.log(finalResult);
    return finalResult;
}

function getDate(days) {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var x = d.getDay() + days
    if (x >= 7) {
        x = x - 7
    }
    var day = weekday[x];
    return day;
}

function getMonthAndDay() {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    let x = month[d.getMonth()];
    return(d.getDate() + x );
}


// var weather = []
// var myHttp = new XMLHttpRequest(); // CREATING AN INSTANCE OF XMLHTTP REQUEST WHICH IS AN OBJECT
// myHttp.open('GET',' http://api.weatherapi.com/v1/current.json?key=6da994b9f0b84833a86224721232002&q=cairo');// specify the the http location that i want to go to and the method that is needed to be with the http
// myHttp.send(); // ass for connection
// myHttp.addEventListener("readystatechange", function(){
//     //the "readystatechange" is an event that checks te change of ready state because it takes time to get the request done, without this event the code will run and finish while the readystate is equal to one because the javascript code will finish the code before it gets to 4
//     if(myHttp.readyState==4){
//         console.log(myHttp.response)
//         console.log("Hello")
//         weather= JSON.parse(myHttp.response)
//         console.log(weather);
//     }
//         //there are 4 readystate stages that happens during a request, when the ready state is equal to 4 then the request is sent and came back to me so that i could begin to do operations with the data
// })
