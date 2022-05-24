'use strict';

//event loop: sends callbacks from queue to call stack and decides which code will be executed
//In a nutshel the web apis environment, the callback queue, and the event loop all together make it possible asynchronous code can be executed in a non blocking way, even with only one thred of execution in the engine.
//With promises things working differently: the callback which comes from a promise will not be moved into the callback queue. Callbacks of promises has a special queue =>microtasks queue: has priority over the callback queue. If one microtasks adds any new microtasks than this one will be priority in the call stack execution. The microtsks queue can starve the callback queue.

//Event loop in practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); //create a promise that immediately fulfilled

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000; i++) {}
//   console.log(res);
// });
// console.log('Test end!');

//Building a simple promise
//Lottery project

//Promise constructor: takes one argument(executor) function which function takes resolve and reject, promises special objects.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   //we win the lottery
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN! 💰');
//     }
//     //we loose
//     else {
//       reject('You lost your money 💩');
//     }
//   }, 2000);
// });

// //consume promise:We consume a promise by calling then() and catch() methods on the promise.
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err)); //so the res going to be you win and the error will be you lost..

// //prmisifying the setTimeout func with wait func
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     ////no need reject as impossible the timer to fail in this case
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// //asynch sequence
// wait(2)
//   .then(() => {
//     //we will not getting any resolved value
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// //create fullfilled or rejected promise immediately
// Promise.resolve('You WIN! 💰').then(x => console.log(x));
// Promise.reject('You WIN! 💰').catch(x => console.error(x));

//Promisifying the geolocation

// console.log('Getting position');
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), //succes callback function
    //   err => reject(err)
    // );
    //same as above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

//----------------using getPosition() func in our challange
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

  countriesContainer.style.opacity = 1;
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country no found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 💣💣💣`);
    });
};

const btn = document.querySelector('.btn-country');
btn.addEventListener('click', whereAmI);
