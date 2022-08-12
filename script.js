const apikey = "11e34ad66443343a1ef082cee7a46b3d";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherbyLocation(city) {
  const resp = await fetch(url(city), {origin: "cors"});
  const respData = await resp.json();

addWeatherToPage(respData);
}

function addWeatherToPage(data){
  const tempC = KtoC(data.main.temp);
  const tempF = CtoF(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
  <h2><img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">${tempF}°F<img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h2><h6>${tempC}°C </h6> <small> ${data.weather[0].main}</small>
  `
  main.innerHTML = ' ';
  main.appendChild(weather);
}

function KtoC(K){
  return Math.floor(K - 273.15);
}

function CtoF(K){
  return Math.floor((K - 273.15) * 9 / 5 + 32);
}

form.addEventListener('submit', (e) =>{
  e.preventDefault();

  const city = search.value;

  if(city){
    getWeatherbyLocation(city);
  }
});

