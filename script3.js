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
// console.log('FIRST'); //this should be printed first

//the async await is basically syntectic sugar over then() method in promises, behind the scenes we still using primises

//finish the func with geolocation and reverse geocoding
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   //Geolocation
//   const position = await getPosition();
//   const { latitude: lat, longitude: lng } = position.coords;

//   //Reverse geocoding
//   const responseGeoCoding = await fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json`
//   );
//   const dataGeo = await responseGeoCoding.json();
//   console.log(dataGeo);

//   //Country data
//   const response = await fetch(
//     `https://restcountries.com/v2/name/${dataGeo.country}`
//   );

//   const data = await response.json();
//   console.log(data);

//   renderCountry(data[0]);
// };
// whereAmI(); //we will get the data where we actually are -> UK

//ERROR HANDLING WITH TRY CATCH

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
// const renderError = function (message) {
//   countriesContainer.insertAdjacentText('beforeend', message);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     //Geolocation
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;

//     //Reverse geocoding
//     const responseGeoCoding = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json`
//     );
//     //Manually creating an error for catch to reject the promise, otherwise just the simple err messages inside catch wont do just displaying the error
//     if (!responseGeoCoding.ok) throw new Error('Problem getting location data');
//     const dataGeo = await responseGeoCoding.json();
//     console.log(dataGeo);

//     //Country data
//     const response = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );

//     //same goes here
//     if (!responseGeoCoding.ok) throw new Error('Problem getting country');
//     const data = await response.json();
//     console.log(data);

//     renderCountry(data[0]);
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`💥 ${err.message}`);
//   }
// };
// whereAmI();

//RETURNING VALUES FROM ASYNC FUNCTIONS
const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    //Reverse geocoding
    const responseGeoCoding = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    //Manually creating an error for catch to reject the promise, otherwise just the simple err messages inside catch wont do just displaying the error
    if (!responseGeoCoding.ok) throw new Error('Problem getting location data');
    const dataGeo = await responseGeoCoding.json();
    console.log(dataGeo);

    //Country data
    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );

    //same goes here
    if (!responseGeoCoding.ok) throw new Error('Problem getting country');
    const data = await response.json();
    console.log(data);

    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`💥 ${err.message}`);

    //Reject promise returned from async function
    throw err; //sometimes need to re-throw the error to be able to see
  }
};
// const city = whereAmI();
// console.log(city); //this will return just in the console a promise: Promise{<pending>}
//and this will be later the You are in...

// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message} 💥`)).finally(()=>console.log('Finished getting location')); //You are in MANCHESTER, United Kingdom

//convert the above to async function
(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('Finished getting location');
})();

//RUNNING PROMISES IN PARALLEL
//WE WNAT TO GET 3 COUNTRY DATA AT THE SAME TIME but their orders which we get first not matter

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);
    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);
//     //we can run them in parallel in the same time saving valuable loading time instead of sequence
//promise.all combinator
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('hungary', 'canada', 'tanzania'); //(3) ['Budapest', 'Ottawa', 'Dodoma']

//so when you have a situation when you need to do multiple async operations at the same time, they dont depend on one an other, you alway should run them on parallel

//OTHER PROMISE COMBINATORS/_race/allSettled and any

//Promice.race
//the first settled promise win the race

//below these promises will race against each other
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

//creating a special timeout project which will be automatically reject after certain time passed
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    });
  }, sec * 1000);
};

//so if the timeout happens first than the rest will be rejected
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(1),
  //using now then (we could alos use async await)
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

//Promise.allSettled returns an array of all the results of all the promises

Promise.allSettled([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Succes'),
]).then(res => console.log(res));

// 0: {status: 'fulfilled', value: 'Succes'}
// 1: {status: 'rejected', reason: 'ERROR'}
// 2: {status: 'fulfilled', value: 'Another Succes'}

Promise.all([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//we get ERROR as Promise.all will shortcircut if we have one rejected promise, that is the difference between the above

//Promise.any: will return the first fulfilled promise, will ignore rejected promises
Promise.any([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Succes'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
