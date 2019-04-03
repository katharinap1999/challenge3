/* CHALLENGE 3 */

// API Keys
var weatherApiKey = 'b44c4e041f03cd862a58bab897d2c417';
var algorithmiaApiKey = 'simzvgX5nuK8VnWE+b55Ls4j6qF1';
var nasaApiKey = 'ZYD3okEzCQMCQAYC7iHddfbN0l7TojSkvMlhwNdS';

//Buttons

var btnPower = document.querySelector('.btn-power');
var btnStationLeft = document.querySelector('.btn-station-left');
var btnStationRight = document.querySelector('.btn-station-right');

//Recording Icon

var recIcon1 = document.querySelector('.rec-icon');
var recIcon2 = document.querySelector('.video-02 .rec-icon');
var rocketEl = document.querySelector('.elevation-box .rocket');

//Stations

var stationDataEl = document.querySelector('.station-data');
var stationData01El = stationDataEl.querySelector('.item-01');

//Asteroid

var asteroidBox = document.querySelector('.asteroid-box');
var asteroidRadarLineEl = asteroidBox.querySelector('.radar-line');
var asteroidEls = asteroidBox.querySelectorAll('.asteroid'); 
var asteroidDataEl = document.querySelector('.asteroid-data');
var asteroidData01El = asteroidDataEl.querySelector('.item-01');
var asteroidData02El = asteroidDataEl.querySelector('.item-02');
var asteroidData03El = asteroidDataEl.querySelector('.item-03');
var asteroidData04El = asteroidDataEl.querySelector('.item-04');

//Weather 

var weatherBox = document.querySelector('.weather-box');
var weatherImgEl = weatherBox.querySelector('img');

var weatherDataEl = document.querySelector('.weather-data');
var weatherData01El = weatherDataEl.querySelector('.item-01');
var weatherData02El = weatherDataEl.querySelector('.item-02');
var weatherData03El = weatherDataEl.querySelector('.item-03');
var weatherData04El = weatherDataEl.querySelector('.item-04');
var weatherData05El = weatherDataEl.querySelector('.item-05');


var asteroids = [];
var asteroidIndex = 0;
var stationIndex = 0;

//Landing Stations - Names and Coordinates

var landingStations = [
  { 
    coordinates: [28.576026, -80.644476],
    name: 'John F. Kennedy Space Center',
    city: 'Florida'
  },
  { 
    coordinates: [34.732237, -120.569915],
    name: 'Vandenberg Air Force Base',
    city: 'California'
  },
  { 
    coordinates: [28.488248, -80.573672],
    name: 'Cape Canaveral Air Force Station',
    city: 'Florida'
  },
];


//Animation for Recording Icons


function animateRecIcons() {
  var tl = new TimelineMax();
   tl.to(recIcon1,1,{ opacity: 0});
   tl.to(recIcon1,1, { opacity: 1});

  var tl2 = new TimelineMax();
   tl2.to(recIcon2,1,{ opacity: 0});
   tl2.to(recIcon2,1, { opacity: 1, onComplete: animateRecIcons});


}

//Animation for Radar Line

animateRecIcons();

function animateRadarLine() {
  TweenMax.set(asteroidRadarLineEl, {rotation: 0});
  TweenMax.to(asteroidRadarLineEl, 3, {
    rotation: 359, 
    ease: Power1.easeOut,
    onComplete: animateRadarLine
  });
}
animateRadarLine();


//Different API's

function getApiData() {
  console.log('Data loading..');
  loadWeatherApiByLatLon(landingStations[stationIndex].coordinates);
  loadAsteriodsFromNasa();
  loadElevationByLatLon(landingStations[stationIndex].coordinates);
  loadStation();
}

//Rocket 

function loadStation() {
  TweenMax.fromTo(rocketEl,.8, {opacity:0}, {opacity: 1});
  TweenMax.fromTo(stationData01El,.8, {opacity:0}, {opacity: 1});
  stationData01El.innerText = landingStations[stationIndex].name + ' (' + landingStations[stationIndex].city + ').';
}

//API for Asteroids 

function loadAsteriodsFromNasa() {
  var baseUrl = 'https://api.nasa.gov/neo/rest/v1/neo/sentry';
  var params = `?is_active=true&page=1&size=5&api_key=${nasaApiKey}`;
  var request = baseUrl + params;
  fetch(request)
  .then(function(res) {
    //if (!res.ok) throw Error(res.statusText);
    return res.json();
  })
  .then(function(res) {
    renderAsteriodView(res);
   })
};

//API for Weather

function loadWeatherApiByLatLon(coordinates) {
  var baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  var params = `?appid=${weatherApiKey}&lat=${coordinates[0]}&lon=${coordinates[1]}`;
  var request = baseUrl + params;
  fetch(request)
  .then(function(res) {
    // if (!res.ok) throw Error(res.statusText);
    return res.json();
  })
  .then(function(res) {
    renderWeatherView(res);
   })
}

//Asteriod Elements


function renderAsteriodView(res) {
  asteroids[0] = { 
    name: `${res.sentry_objects[0].sentryId} ${res.sentry_objects[0].fullname}`,
    yearRangeMin: res.sentry_objects[0].year_range_min,
    yearRangeMax: res.sentry_objects[0].year_range_max,
    potentialImpacts: res.sentry_objects[0].potential_impacts,
    lastObs: res.sentry_objects[0].last_obs,
    x: 50,
    y: 100 
  };
  asteroids[1] = { 
    name: `${res.sentry_objects[1].sentryId} ${res.sentry_objects[1].fullname}`,
    yearRangeMin: res.sentry_objects[1].year_range_min,
    yearRangeMax: res.sentry_objects[1].year_range_max,
    potentialImpacts: res.sentry_objects[1].potential_impacts,
    lastObs: res.sentry_objects[1].last_obs,
    x: 400,
    y: 160 
  };
  asteroids[2] = { 
    name: `${res.sentry_objects[2].sentryId} ${res.sentry_objects[2].fullname}`,
    yearRangeMin: res.sentry_objects[2].year_range_min,
    yearRangeMax: res.sentry_objects[2].year_range_max,
    potentialImpacts: res.sentry_objects[2].potential_impacts,
    lastObs: res.sentry_objects[2].last_obs,
    x: 250,
    y: 0 
  }
  asteroids[3] = { 
    name: `${res.sentry_objects[3].sentryId} ${res.sentry_objects[3].fullname}`,
    yearRangeMin: res.sentry_objects[3].year_range_min,
    yearRangeMax: res.sentry_objects[3].year_range_max,
    potentialImpacts: res.sentry_objects[3].potential_impacts,
    lastObs: res.sentry_objects[3].last_obs,
    x: 200,
    y: 320 
  }

  generateAsteroids();
  setAsteroidDataById(0);
}


//Weather Elements 



function renderWeatherView(res) {
  var weather = {};
  weather.description = res.list[0].weather[0].description;
  weather.iconImage = `assets/img/ch-03/weather-icons/${res.list[0].weather[0].icon}.png`;
  weather.windSpeed =  res.list[0].wind.speed;
  weather.windDeg =  res.list[0].wind.deg;
  weather.time = res.list[0].dt_txt;
  // get temperature from Kelvin in Celsius (-273.15)
  weather.celsius = Math.floor(res.list[0].main.temp - 273.15);
  weather.celsiusMin = Math.floor(res.list[0].main.temp_min - 273.15);
  weather.celsiusMax = Math.floor(res.list[1].main.temp_max - 273.15);


//Displaying Weather Elements on Interface

  weatherImgEl.src = weather.iconImage;
  weatherData01El.innerText = weather.description;
  weatherData02El.innerHTML = 'wind speed: ' + weather.windSpeed + '<br>deg.:' + weather.windDeg;
  weatherData03El.innerText = 'time: ' + weather.time;
  weatherData04El.innerText = 'celsius:' + weather.celsius + '°C';
  weatherData05El.innerText = 'min: ' + weather.celsiusMin + '°C max:' + weather.celsiusMax + '°C';
  
}

//Asteroids Clicking Event (i = 0) NodeList.forEach(callback[, thisArg]);

function generateAsteroids() {
  /*https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach*/
  asteroidEls.forEach( function(el, i) {
    TweenMax.set(el,{x: asteroids[i].x , y: asteroids[i].y });
    el.addEventListener('click', function() {
      setAsteroidDataById(i);
    })
  }) 

}

//Asterioids displaying Information 

function setAsteroidDataById(id){
  console.log(id);
  asteroidData01El.innerText = asteroids[id].name;
  asteroidData02El.innerText = 'Range Min: ' + asteroids[id].yearRangeMin + ' | Max: ' + asteroids[id].yearRangeMax;
  asteroidData03El.innerText = 'Potential Impacts: ' + asteroids[id].potentialImpacts;
  asteroidData04El.innerText = 'Last Observation: ' + asteroids[id].lastObs;
}

//Right Click Event for Changing Stations - Increasing by each click, if it's higher than 2, it will be set back to 0

function onClickStationRight() {
  console.log('click');
  stationIndex += 1;
  if (stationIndex > 2) {
    stationIndex = 0;
  }

  loadWeatherApiByLatLon(landingStations[stationIndex].coordinates);
  loadStation();
}

//Left Click Event

function onClickStationLeft() {
  console.log('click');
  stationIndex -= 1;
  if (stationIndex < 0) {
    stationIndex = 2;
  }
  loadWeatherApiByLatLon(landingStations[stationIndex].coordinates);
  loadStation();

}

// Events
document.addEventListener('DOMContentLoaded', getApiData);
btnStationLeft.addEventListener('click', onClickStationLeft);
btnStationRight.addEventListener('click', onClickStationRight);



/* CHALLENGE 2 */

var interfaceEl02 = document.querySelector('.interface-challenge-02');
var interfaceEl03 = document.querySelector('.interface-challenge-03');

var clockAnalogEl = document.querySelector('.clock-analog');
var clockBgEl = clockAnalogEl.querySelector('.clock-bg'); 
var clockHoursHandEl = clockAnalogEl.querySelector('.hours-line');
var clockMinHandEl = clockAnalogEl.querySelector('.minutes-line');
var clockSecHandEl = clockAnalogEl.querySelector('.seconds-line');
var clockDisplayEl = document.querySelector('.clock-display');

var btnTimeRight = document.querySelector('.btn-time-right');
var btnTimeLeft = document.querySelector('.btn-time-left');


var cityViewEl = document.querySelector('.city-view');
var cityDisplayEl = cityViewEl.querySelector('.city-display');
var cityImgEl  = cityDisplayEl.querySelector('img');
var cityLineEl = cityDisplayEl.querySelector('.line');  

var weatherBox2El = document.querySelector('.weather-box-2');
var weatherImg2El = weatherBox2El.querySelector('img');

var astronautBoxEl = document.querySelector('.astronaut-box');
var astronautImgEl = astronautBoxEl.querySelector('img');

var powerStatus = false;

var cityIndex = 0;
var cityPosArray = [50, 185, 335]; // 105 VC, 185 FRA, 335 JP
var cityTimezoneArray = [-7, 1, 8]; // https://en.wikipedia.org/wiki/Coordinated_Universal_Time#/media/File:World_Time_Zones_Map.png
var cityImgArray = ['assets/img/ch-02/city-vancouver.jpg', 'assets/img/ch-02/city-frankfurt.jpg', 'assets/img/ch-02/city-japan.jpg'];

var astronautImgArray = ['assets/img/ch-02/astronaut_kjell.jpg', 'assets/img/ch-02/astronaut_alexander.jpg', 'assets/img/ch-02/astronaut_kimiya.jpg'];

var weatherImgArray = ['assets/img/ch-02/weather_day.png', 'assets/img/ch-02/weather_night.png'];

TweenMax.set(interfaceEl02, {opacity: .2});
TweenMax.set(interfaceEl03, {opacity: .2});

// Eventhandler
btnTimeRight.addEventListener('click', onBtnTimeRightClick);
btnTimeLeft.addEventListener('click', onBtnTimeLeftClick);
btnPower.addEventListener('click', onBtnPowerClick);

function setCityPos() {
  var scanLine = document.querySelector('.world-map .scan-line');
  TweenMax.to(scanLine, 1, {
    x: cityPosArray[cityIndex],
    ease: Power2.easeOut
  });
}

setCityPos(cityIndex);


function onBtnPowerClick() {
  console.log('click');

  if (powerStatus == false) {
    powerStatus = true;
    TweenMax.to(interfaceEl02, 1.5, {
      opacity: 1,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });

    TweenMax.to(interfaceEl03, 1.5, {
      opacity: 1,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });
  } else {
    powerStatus = false;
    TweenMax.to(interfaceEl02, 1.5, {
      opacity: .2,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });

    TweenMax.to(interfaceEl03, 1.5, {
      opacity: .2,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });
  }
}

function onBtnTimeRightClick() {
   console.log('click');
  cityIndex += 1; 

  if (cityIndex > 2) {
    cityIndex = 0;
  }
  setAstronaut();
  setCityPos();
  changeCity();
}

function onBtnTimeLeftClick() {
  console.log('click');
  cityIndex -= 1; 
  if (cityIndex < 0) {
    cityIndex = 2;
  }

  setAstronaut();
  setCityPos();
  changeCity();
}


function setAstronaut() {
  var tl = new TimelineMax();
  tl.to(astronautImgEl, .6, {opacity: 0});
  tl.set(astronautImgEl, {
    src: astronautImgArray[cityIndex]
  });
  tl.to(astronautImgEl, .6, {opacity: 1})
}

function changeCity() {
  var tl = new TimelineMax();
  tl.to(cityImgEl, 1, {
    ease: Power1.easeOut,
    y: '100%'
  });
  tl.to(cityLineEl, .5, {
    width: 0,
    ease: Power1.easeOut
  });
  tl.to(cityLineEl, .5, {
    width: '100%',
    ease: Power1.easeOut
  });
  tl.set(cityImgEl, {
    src: cityImgArray[cityIndex]
  });
  tl.to(cityImgEl, 1, {
    ease: Power1.easeOut,
    y: '0%'
  });
}

function clockBgRotation() {
  TweenMax.set(clockBgEl, {rotation: 0});
  TweenMax.to(clockBgEl, 60, {
    rotation: 359, 
    ease: Power1.linear,
    onComplete: clockBgRotation
  });
};
 clockBgRotation();



var myTimer = 1000;

// CLOCK AND DATE
var time = function() {
    // https://stackoverflow.com/a/16048201
    var date = new Date(); 
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    date = new Date(utc + (3600000* cityTimezoneArray[cityIndex]));
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth();
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = date.getFullYear();

    analogWatch(hour,min,sec);

    if( hour < 18 && hour > 8) {
      weatherImg2El.src = weatherImgArray[0];
    } else {
      weatherImg2El.src = weatherImgArray[1];
    }
    

    clockDisplayEl.innerHTML = hour + " : " + min + " : " + sec + " | " + day + "." + monthArray[month] + "." + year;
}


function analogWatch(hour,min,sec) {
  var secondsDeg = 360 * (sec / 60);
  var minutesDeg = 360 * (min / 60);
  var hoursDeg = 360 * (hour + min /60) / 12;


  clockHoursHandEl.style.transform = `rotate(${hoursDeg}deg)`;
  clockMinHandEl .style.transform = `rotate(${minutesDeg}deg)`;
  clockSecHandEl .style.transform = `rotate(${secondsDeg}deg)`;  


}



// calling functions every second
var count = setInterval(time, myTimer);

var counter = 0;

// CLOCK AND DATE END



