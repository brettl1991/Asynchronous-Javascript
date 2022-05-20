'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}"/>
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

  const request = fetch(`https://restcountries.com/v2/name/hungary`);

  const getCountryData = function (country) {
    //Country1
    getJSON(
      `https://restcountries.com/v2/name/${country}`,
      'Country not found!'
    )
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

        if (!neighbour) throw new Error('No neighbour found');

        //Country2
        return getJSON(
          `https://restcountries.com/v2/alpha/${neighbour}`,
          'Country not found!'
        );
      })

      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💣💣💣`);
        renderError(`Something went wrong ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    getCountryData('hungary');
  });
};

const whereAmI = function (lat, lng) {
  const getData = function () {
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(Response => Response.json())
      .then(data => console.log(data));
  };
  getData();
};
whereAmI(52.508, 13.381);
