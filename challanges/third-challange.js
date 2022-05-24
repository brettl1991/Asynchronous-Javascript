'use strict';
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
    });
    resolve(img);

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// let currentImg;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     //hide first img
//     currentImg.style.display = 'none';
//     return createImage('/img/img-2.jpg');
//   })
//   .then(() => {
//     currentImg = img;
//     console.log('Img 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

//////
const loadNPause = async function () {
  try {
    //Load img1
    let img = await createImage('./img/img-1.jpg');
    console.log('Img 1 loaded');
    await wait(2);
    img.style.display = 'none';

    //Load img2
    img = await createImage('./img/img-2.jpg');
    console.log('Img 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    err => console.error(err);
  }
};

loadNPause();

//Part2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); //always when we using async in map ending up getting back just promises, and those we need to handle with Promise.all combinator function
    // console.log(imgs); //we get back just 3 promises, not the actual imgs, so to take them out we use:which already expects an array of elements
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    err => console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3']);
