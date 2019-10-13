const express = require('express');
const app = express();
const fs = require('fs');


app.get('/Version', (req, res) => {
  res.send('This is version 0 of the HotBurger service');

  fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `The version page was accessed at ${Date.now()}\n`);
});

app.get('/Logs', (req, res) => {
  var txt = fs.readFileSync(`${process.env.HOME}/logs/logs.txt`, 'utf8');
  res.send(txt);
});

app.get('/', (req, res) => {
    res.send('Welcome to the HotBurger service!');
    
    fs.appendFileSync(`${process.env.HOME}/logs/logs.txt`, `The homepage was accessed at ${Date.now()}\n`);
  });

const PORT = process.env.PORT || 7566;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});