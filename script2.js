'use strict';

//event loop: sends callbacks from queue to call stack and decides which code will be executed
//In a nutshel the web apis environment, the callback queue, and the event loop all together make it possible asynchronous code can be executed in a non blocking way, even with only one thred of execution in the engine.
//With promises things working differently: the callback which comes from a promise will not be moved into the callback queue. Callbacks of promises has a special queue =>microtasks queue: has priority over the callback queue. If one microtasks adds any new microtasks than this one will be priority in the call stack execution. The microtsks queue can starve the callback queue.

//Event loop in practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //create a promise that immediately fulfilled

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000; i++) {}
  console.log(res);
});
console.log('Test end!');
