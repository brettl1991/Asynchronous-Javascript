'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Synchronous code: the code is executed line by line, the exact order of execution we defined in our code.
//The alert statement is a good example of a long running operations, which block code execution.

//Asynchronous code: Programming the behavior of a program over a period of time. Means not occuring in the same time. Only gonna be executed after a task, that runs in the background finishes. Example setTimeout(). Asynchronous code is non blocking. Execution does not wait for an async task to finish its work. Big difference between async and sync : like with sync previously we had to wait the user to click on the alert window to continue, because alert blocking sync code.
//Callback functions and eventlisteners alone do not make code asynchronous!!!
//Setting an src on any image is asynchronous, because it is like loading the img in the bg.

//AJAX: Asynchronous Javascript And XML: allow us to communicate with remote web servers in an async way. With AJAX calls we can request data from web servers dynamically. XML data format not used anymore, instead most popular data format is JSON data format which basically a JS object converted into a string.

//API: Application Programming Interface: piece of software that can be used by another piece of software in order to allow applications to talk to each other. Many API-s out there: DOM API, Geolocation API, Own Class API, Online API.
//Online API(other names web api or api): application running on a server, that receives requests for data and sends data back as response.
//We can build our own web api-s(require back-end developement (node.js)) or use 3rd party api-s.

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

//old school way to call ajax

//Build card componenet

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

// const getCountryAndNeigbour = function (country) {
//ajax call country 1
// const request = new XMLHttpRequest();
//need url to make ajax call
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
// console.log(this.responseText);

// const [data] = JSON.parse(this.responseText); //destructure as was [{}] and convert to string
// console.log(data);

//render country 1
// renderCountry(data);

//get neighbour contry 2
//Create a sequence of ajax calls, so the second runs only after the first one has finished
// const [neighbour] = data.borders;

// if (!neighbour) return;

//ajax call country 2

// const request2 = new XMLHttpRequest();
//need url to make ajax call
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText); //country codes unique so no array return so we dont need destructure
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeigbour('hungary');

//callback hell: when we have a lot of nested callbacks in order to execute asynchronous tasks in sequence

//PROMISES AND THE FETCH API

//old way:
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

const request = fetch(`https://restcountries.com/v2/name/hungary`);
console.log(request); //immediately return a promise

//promise: an object that used as a placeholder for a future result of an asynchronous operation, like a container for an asynchronously delivered value. Basically a container for a future value.
//2 big advantages of using promises: 1.we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results. 2.Instead of nesting we can chain promises for a sequence of asynchronous operations: escaping callback hell!

//Promise lifestyle: 1.before the future value is available promises are pending 2. when the task are finishes the promise is settled( fullfilled promises: has succesfully resulted a value just how we expected, rejected promises: has been an error during the asynchronous task (example an error when a user is offline and cant connect to the api server)). We are able to handle these different states in our code. Promise is only settled once!!!! So impossible to change that stage. Consume a promise when we already have a promise, like when promise returned from fetch (api), but first the promise have to built(like fetch api).

//Consuming promise

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response); //how we handle a fulfilled promise which returned by fetch function
//       return response.json(); //this method available on all the response objects, result value, so to be able to read the data from the response need to call json method which will also return a promise so we can call again the then() method to access the data
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//cleaner:
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('hungary');

//helper function for fetch

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);
    return response.json();
  });
};
// //chaining promises
// const getCountryData = function (country) {
//   //Country1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//       // err => alert(err) //we catch with this the error
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neigbhour = 'vuyfgbhjcvb';
//       if (!neighbour) return;

//       //Country2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💣💣💣`); //this will show up in console
//       renderError(`Something went wrong ${err.message}. Try again!`); //this will show up when we click the btn(Something went wrong Failed to fetch. Try again!)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); //this method avaliable on all promises besides then() and catch().Inside the callback function will be called no matter the promise fulfilled or rejeced, gonna be called always that we write. Then method only called when promise fulfilled, catch method only called when promise rejected.
// };

//chaining promises
const getCountryData = function (country) {
  //Country1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neigbhour = 'v?uyfgbhjcvb';//if the error will be in the 2nd fetch by adding non valid neigbhour data
      if (!neighbour) throw new Error('No neighbour found');

      //Country2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found!'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💣💣💣`); //this will show up in console
      renderError(`Something went wrong ${err.message}. Try again!`); //this will show up when we click the btn(Something went wrong Failed to fetch. Try again!)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); //this method avaliable on all promises besides then() and catch().Inside the callback function will be called no matter the promise fulfilled or rejeced, gonna be called always that we write. Then method only called when promise fulfilled, catch method only called when promise rejected.
};

//Handling error messages upon promise rejection
//only error could happen with fetch that the user loses internet
btn.addEventListener('click', function () {
  getCountryData('hungary');
});

//after this we get a btn pop up (where am I?) and when we offline we get an error message in the console(failed to fetch). To handle rejections we have 2 options: 1. pass a 2nd callback func in the then() method. But instead of 2nd callback functions there is a  2nd option, much nicer way to handle fetch errors is to handle errors globally, assind a catch() method.

//Throwing errors manually (fixing 404 error)
// getCountryData('vgwbdukjvb khbdc'); //up above throw new Error, so the effect of throwing an error message will lead to the promise will be rejected if is this the case

//FIRST CHALLANGE

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
