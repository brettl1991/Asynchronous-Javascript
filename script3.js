'use strict';

//re-create the whereAmI function

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  //special class been created in html for neighbour contries
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

  //insert html to our page:
  countriesContainer.insertAdjacentHTML('beforeend', html);

  //set countries opacity to 1
  countriesContainer.style.opacity = 1;
};

//consuming promises with async/await
// const whereAmI = async function (country) {
//   //this below exactly the same as before we used like this:
//   // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
//   //   console.log(res)
//   // );
//   const response = await fetch(`https://restcountries.com/v2/name/${country}`); //await will wait until the data has been fetched
//   console.log(response);
//   //get data
//   const data = await response.json();
//   console.log(data);

//   //render data
//   renderCountry(data[0]);
// };
// whereAmI('hungary');
console.log('FIRST'); //this should be printed first

//the async await is basically syntectic sugar over then() method in promises, behind the scenes we still using primises

//finish the func with geolocation and reverse geocoding
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  //Geolocation
  const position = await getPosition();
  const { latitude: lat, longitude: lng } = position.coords;

  //Reverse geocoding
  const responseGeoCoding = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json`
  );
  const dataGeo = await responseGeoCoding.json();
  console.log(dataGeo);

  //Country data
  const response = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );

  const data = await response.json();
  console.log(data);

  renderCountry(data[0]);
};
whereAmI(); //we will get the data where we actually are -> UK
