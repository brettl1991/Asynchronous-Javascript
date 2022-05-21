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
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  //we win the lottery
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN! 💰');
    }
    //we loose
    else {
      reject('You lost your money 💩');
    }
  }, 2000);
});

//consume promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err)); //so the res going to be you win and the error will be you lost..

//prmisifying the setTimeout func with wait func
const wait = function (seconds) {
  return new Promise(function (resolve) {
    ////no need reject as impossible the timer to fail in this case
    setTimeout(resolve, seconds * 1000);
  });
};

//asynch sequence
wait(2)
  .then(() => {
    //we will not getting any resolved value
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

//create fullfilled or rejected promise immediately
Promise.resolve('You WIN! 💰').then(x => console.log(x));
Promise.reject('You WIN! 💰').catch(x => console.error(x));
