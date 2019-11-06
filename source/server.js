const express = require('express');
const app = express();

const fs = require('fs');

const food = [
  {name: 'Hotdog', price: '20'},
  {name: 'Hamburger', price: '35'},
  {name: 'Soda', price: '4'},
  {name: 'Cookie', price: '6'},
];


function log(str) { 
  try {
    fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `3, ${str} ${getDate()}\n`);
  } catch () {
    fs.writeFile(`${process.env.HOME}/logs/logs.txt`);
  }
   
}


function getDate(){
  var current = new Date();
  var date = current.getFullYear()+'/'+(current.getMonth()+1)+'/'+current.getDate();
  var time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  var currentTime = date + ' ' + time;

  return currentTime;
}


app.post('/order/:item/:quantity', (req, res) => {

var item = req.params.item;
var quantity = req.params.quantity;

if (item in food && quantity < 100 && quantity > 0){
  var data = {
        "Item": req.params.item,
        "Quantity": req.params.quantity
  }
}; 

log(`3, @${item} of item #${quantity} for ${food}.`);

res.send(`You have bough `);
});


app.get('/Version', (req, res) => {
  res.send('This is version 0 of the HotBurger service');
  fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `2, The version page was accessed successfully.\n`);
});


app.get('/menu', (req, res) => {
  res.send(food);
});


app.get('/', (req, res) => {
    res.send('Welcome to the HotBurger service!');
    fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `1, The homepage was accessed successfully.\n`);
  });


const PORT = process.env.PORT || 7566;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});