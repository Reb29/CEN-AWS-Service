const express = require('express');
const app = express();
const fs = require('fs');

var food = [
  {name: 'Hotdog', price: '20'},
  {name: 'Hamburger', price: '35'},
  {name: 'Soda', price: '4'},
  {name: 'Cookie', price: '6'},
];


function getPrice(foodItem) {
  for (var i = 0; i < food.length; i++) {
    if (food[i].name === foodItem) {
      return food[i].price;
    }
  }
console.log("Food item not found.")
return 0;
}


function log(str) { 
    fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `${str} %${getDate()}%\n`);
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
var quantity = parseInt(req.params.quantity);
var price = getPrice(item) * parseInt(quantity);


if (price > 0 || quantity < 1 || quantity > 100){
  res.send(`You have bought ${quantity} ${item} for ${price} dollars.`);
  log(`3, SUCCESS @${quantity}@ of item #${item}# was purchased for !${price}!`);
} else {
  res.send("There was an error with your purchase. Ensure the item is on the menu and quantity is from 1-100.");
  log(`4, ERROR There was a problem with a purchase. @${quantity}@ #${item}#`)
}
});


app.get('/Version', (req, res) => {
  res.send('This is version 0 of the HotBurger service');
  log(`2, The version page was accessed successfully.`);
});


app.get('/menu', (req, res) => {
  var menu = "";
  for (var i = 0; i < food.length; i++) {
    menu = menu + food[i].name + " - $" + food[i].price + "\n<br>";
  }
  res.send(menu);
});


app.get('/', (req, res) => {
    res.send('Welcome to the HotBurger service!');
    log(`1, The homepage was accessed successfully`);
  });


const PORT = process.env.PORT || 7566;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});