const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeNow = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {

   // const cityWay = data.cityWay;
    //const weather = data.weather;

    //destructuring

    const {cityWay, weather} = data;

    //update details template

    details.innerHTML = `
    <h5 class="my-3">${cityWay.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

// update the night/day and icons image

const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);


let timeSrc = null;

if(weather.IsDayTime){
    timeSrc = 'img/day.svg';
}else {
    timeSrc = 'img/night.svg';
}

timeNow.setAttribute('src', timeSrc);


   //remove the d-none class if present
   
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none'); 
  }
}


  cityForm.addEventListener('submit', e => {
//prevent default reload
e.preventDefault();

//get city value
const city = cityForm.city.value.trim();

cityForm.reset();

//update the ui with new city 
forecast.updateCity(city)
.then(data => updateUI(data))
.catch(error => console.log(error));
  
//set local storage
localStorage.setItem('city', city);

});


if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}