const searchForm = document.querySelector('.search-loaction');
const villeValue = document.querySelector('.search-loaction input');
const villeName = document.querySelector('.city-name p');
const body = document.querySelector('.body');
const cartInfo = document.querySelector('.back-cart');

const spit = (mt) => {
    celci = Math.round(mt - 273.15);
    return celci;
}
update = (city) => {
  // le nom de la ville:
  villeName.textContent = city.name;
  // tartib le page:
  body.innerHTML = ` <div class="card-mid row">
          <div class="col-8 text-center temp">
            <span>${spit(city.main.temp)}&deg;C</span>
          </div>
          <div class="col-4 condition-temp">
            <p class="hi">${spit(city.main.temp_max)}&deg;C</p>
            <p class="lo">${spit(city.main.temp_min)}&deg;C</p>
          </div>
        </div>
        <div class="card-bottom px-5 py-4 row">
          <div class="col text-center">
            <p>${city.main.humidity}%</p>
            <span>Humidité</span>
          </div>
        </div> `
    cartInfo.classList.remove('d-none');
}
//add an event listner to the form
searchForm.addEventListener('submit', e => {

    e.preventDefault();
    const villeSearched = villeValue.value.trim();
    searchForm.reset();

    requestCity(villeSearched)
        .then((data) => {
            update(data);
        })
})
// api:
const key = 'cbe3dd267a18f6c89943b3eff94f1ed7';
const requestCity = async (city) => {

    const api = 'http://api.openweathermap.org/data/2.5/weather'
    const quer = `?q=${city}&appid=${key}`;
    const response = await fetch(api + quer);
    const data = await response.json();
    return data;
}
