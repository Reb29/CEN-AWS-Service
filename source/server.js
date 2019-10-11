const express = require('express');
const app = express();
const fs = require('fs');


app.get('/Version', (req, res) => {
  res.send('The current version is 1.0.0!');

  fs.appendFileSync('logs.txt', `The version page was accessed at ${Date.now()}\n`);
});

app.get('/Logs', (req, res) => {
  var txt = fs.readFileSync('source/logs/logs.txt', 'utf8');
  res.send(txt);
});

app.get('/', (req, res) => {
    res.send('Hello from');
    
    fs.appendFileSync('source/logs/logs.txt', `The homepage was accessed at ${Date.now()}\n`);
  });

const PORT = process.env.PORT || 7566;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});