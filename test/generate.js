const users = require('./users.json');
const boxes = require('./boxes.json');
const fs = require('fs');

// // Generate usernames
// users.forEach((element) => {
//   element.username = generateUsername();
// });
// fs.writeFile('users.json', JSON.stringify(users), 'utf-8');

// function generateUsername () {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   const length = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }

// // Generate box "shortId"s
// let boxIds = [];
// boxes.forEach((element) => {
//   element.shortId = 'BOX' + generateId();
// });
// fs.writeFile('boxes.json', JSON.stringify(boxes), 'utf-8');

// function generateId () {
//   let currRandom;
//   do {
//     currRandom = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//   } while (exists(currRandom));

//   return currRandom;
// }

// function exists (number) {
//   let exists = false;
//   boxIds.forEach((element) => {
//     if (element === number) {
//       exists = true;
//     }
//   });

//   return exists;
// }

// // Link boxes to usernames
// users.forEach((element) => {
//   element.boxesFound = generateBoxes();
// });
// fs.writeFile('users.json', JSON.stringify(users), 'utf-8');

// function generateBoxes () {
//   const numberOfBoxes = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

//   let boxesFound = [];
//   for (let i = 0; i < numberOfBoxes; i++) {
//     const index = Math.floor(Math.floor(Math.random() * boxes.length));
//     const start = new Date(2012, 0, 1);
//     const end = new Date();

//     const foundDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

//     boxesFound.push({
//       id: boxes[index]._id,
//       foundDate: foundDate
//     });
//   }

//   return boxesFound;
// }
