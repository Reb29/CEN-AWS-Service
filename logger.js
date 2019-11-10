const express = require('express');
const app = express();
const fs = require('fs');
const readline = require('readline');

var file = `${process.env.HOME}/logs/logs.txt`;

let rl = readline.createInterface({
    input: fs.createReadStream(file)
});

function resetReader(){
rl = readline.createInterface({
    input: fs.createReadStream(file)
});
}

app.get('/gettotal', (req, res) => {
    resetReader();

    var total = 0;

    rl.on('line', function(line) {
        if(line.charAt(0) === '3') {
            var data = line.substring(
                line.indexOf("!") + 1, 
                line.lastIndexOf("!")
            );
        total = total + parseInt(data);
        }
    });

    rl.on('close', function() {
    res.send("The total earned is $" + total);
     })
});

app.get('/gettopseller', (req, res) => {
    resetReader();

    var countList = ['Total sales'];
    var top = {name:"1",ammount:"1"};

    rl.on('line', function(line) {
        if(line.charAt(0) === '3') {
            var item = line.substring(
                line.indexOf("#") + 1, 
                line.lastIndexOf("#")
            );
            var quantity = parseInt(line.substring(
                line.indexOf("@") + 1, 
                line.lastIndexOf("@")
            ));

            loop:
            for (var i = 0; i < countList.length; i++) {
                if (countList[i].name === item) {
                  countList[i].ammount+=quantity;
                  break loop;
                }

                if (i == countList.length-1){
                    var element = {};
                    element.name = item;
                    element.ammount = quantity;
                    countList.push(element);
                    break loop;
                }
            }  
        } 

            for (var i = 0; i < countList.length; i++) {
            if (countList[i].ammount > top.ammount){
            top = countList[i];   
            }   
        }
    });

    rl.on('close', function() {
        console.log(countList);
        res.send(`The top selling item is the ${top.name} with a total of ${top.ammount} sales.`);
         })
});

app.get('/getrequestcount', (req, res) => {
    resetReader();

    var count = 0;

    rl.on('line', function(line) {
        if(line.charAt(0) === '3' || line.charAt(0) === '4') {
        count++;
        }
    });

    rl.on('close', function() {
        res.send(`The total number of requests is ${count}`);
         })
});

app.get('/getlastrequeststatus', (req, res) => {
    resetReader();

    var response;

    rl.on('line', function(line) {
        if(line.charAt(0) === '3' || line.charAt(0) === '4') {
                response = line.substring(
                line.indexOf(",") + 2, 
                line.indexOf("@")
            );
        }
    });

    rl.on('close', function() {
        res.send(`The last response was ${response}`);
         })
});

app.get('/getlastrequesttime', (req, res) => {
    resetReader();

    var time;

    rl.on('line', function(line) {
        if(line.charAt(0) === '3' || line.charAt(0) === '4') {
                time = line.substring(
                line.indexOf("%") + 1, 
                line.lastIndexOf("%")
            );
        }
    });

    rl.on('close', function() {
        res.send(`The last response was at ${time}`);
         })
});

const PORT = process.env.PORT || 7566;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

