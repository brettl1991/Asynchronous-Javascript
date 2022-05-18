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

//old school way to call ajax

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  //need url to make ajax call
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText); //destructure as was [{}] and convert to string
    console.log(data);

    //Build card componenet

    const html = `
  <article class="country">
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
  });
};

getCountryData('hungary');
getCountryData('usa');
