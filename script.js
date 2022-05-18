'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Synchronous code: the code is executed line by line, the exact order of execution we defined in our code.
//The alert statement is a good example of a long running operations, which block code execution

//Asynchronous code: Programming the behavior of a program over a period of time. Means not occuring in the same time. Only gonna be executed after a task, that runs in the background finishes. Example setTimeout(). Asynchronous code is non blocking. Execution does not wait for an async task to finish its work, big difference between async and sync : like with sync previously we ad to wait the user to click on the alaert window to continue, because alert blocking sync code.
//Callback functions and eventlisteners alone do not make code asynchronous!!!
//Setting an src on any image is asynchronous, because it is like loading the img in the bg.

//AJAX:Asynchronous Javascript And XML: allow us to communicate with remote web servers in an asyn way. with AJAX calls we can request data from web servers dynamically.

//API: Application Programming Interface: piece of software that can be used by another piece of software in order to alloe applications to talk to each other. Many API-s out there: DOM API, Geolocation API, Own Class API, Online API.
//Online API(other names web api or api): application running ona server, that receives requests for data and sends data back as response.
//We can build our own web api-s(require back-end developement (node.js)) or use 3rd party api-s.
