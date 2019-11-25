// colors lib
let colors = require('colors');
// http + https lib
const https = require('https');
const http = require('http');
// file system lib
const fs = require('fs');
// express lib
const express = require('express');
// cors lib
const cors = require('cors');
// body parser lib
const bodyParser = require('body-parser');
// jwt lib
const jwt = require('jsonwebtoken');
// jwt checker lib
const jwtchecker = require('express-jwt');
// cookie parser lib
const cookieParser = require('cookie-parser');
// bcrypt lib
const bcrypt = require('bcrypt');



// importamos el logger del módulo
const logger = require('./logger');
// importamos sendEmail del módulo
const sendEmail = require('./alerter');




// importamos secretos
const secretsFile = fs.readFileSync('secrets.json');
const secrets = JSON.parse(secretsFile);

const server = express(); // función constructora del server





// middlewares
server.use(cors()); // habilitamos CORS en todos los endpoints de todas las peticiones
server.use(bodyParser.json());
server.use(cookieParser());
server.use(jwtchecker({
    secret: secrets['jwt_clave'],
    getToken: (req) => {
        return req.cookies['jwt'];
    }
}).unless({ path: ['/register', '/login'] }));

server.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ 'error': 'Acceso no permitido' });
});



/*
***********************************************************************
CONFIG ENDPOINTS
***********************************************************************
*/

server.post("/register", (req, res) => {
    fs.readFile('users.json', (err, fileContents) => {
        const users = JSON.parse(fileContents);
        const userFound = users.filter(e => e.username === req.body.username);
        bcrypt.hash(req.body.password, 11, function (err, hash) {
            if (userFound.length > 0) {
                if (hash.password === req.body.password) {
                    res.send({ "error": "you have already been registered. please log in" });
                }
                else {
                    res.send({ "error": "that username is already in use" });
                }
            }
            else {
                users.push({
                    "username": req.body.username,
                    "password": hash
                });
                fs.writeFile('users.json', JSON.stringify(users), () => {
                    res.send({ "userRegistered": true });
                    logger.log('info', `Usuario registrado. User name: ${req.body.username}`)
                    console.log("user registered");
                });
            }
        });

    })
});


server.post("/login", (req, res) => {
    fs.readFile('users.json', (err, fileContents) => {
        const users = JSON.parse(fileContents);
        const userFound = users.filter(e => e.username === req.body.username);
        if (userFound.length > 0) {
            bcrypt.compare(req.body.password, userFound[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ 'username': req.body.username }, secrets['jwt_clave']);
                    console.log(token);
                    // res.header('Set-Cookie', `jwt=${token}; httponly; maxAge: 99999`);
                    res.cookie(`jwt`, `${token}`);
                    res.send({ "logged": true });
                    console.log("user logged");
                }
                else{
                    res.send({ "logged": false });
                }
                if (err) throw error;
            });
        }
        else{
            console.log("nottrue");
            res.send({ "logged": false });
        }
    })
});


server.get("/bigBrother", (req, res) => {
    jwt.verify(req.cookies['jwt'], secrets['jwt_clave'], (err, decoded) => {
        if (err) throw error;
        if (decoded.username === "n i n a") {
            fs.readFile('combined.log', (err, fileContents) => {
                const logs = fileContents;
                res.send(logs);
                console.log("checking logs");
            })
        } else {
            sendEmail(
                secrets['myEmail'],
                secrets['myPassword'],
                secrets['myEmail'],
                'DANGER!',
                'Intrusion attempt has been identified.'
            );
            res.send("Danger email has been sent");
            console.log("danger email has been sent");
        }
    });
});


/*
***********************************************************************
CRUD ENDPOINTS
***********************************************************************
*/

server.post("/event", (req, res) => {
    console.log("post request received from /event");
    const body = req.body;
    fs.readFile('event.json', (error, fileContents) => {
        let arrayOfEvents = JSON.parse(fileContents);
        higherId = 0;
        for (event of arrayOfEvents) {
            let currentEventId = parseInt(event["eventId"]);
            if (currentEventId > higherId) {
                higherId = currentEventId;
            }
        }
        body["eventId"] = JSON.stringify(higherId++);
        arrayOfEvents.push(body);
        fs.writeFile(`event.json`, JSON.stringify(arrayOfEvents), () => {
            res.send({ "eventAdded": true });
            console.log("new event added to evenj.json");
        });

    });
});


server.get("/events", (req, res) => {
    console.log("get request received from /events");
    fs.readFile('event.json', (error, fileContents) => {
        res.send(JSON.parse(fileContents));
        console.log({ "listOfEventsSent": true });
    });
});


server.put("/event", (req, res) => {
    console.log("put request received from /event");
    const body = req.body;
    fs.readFile('event.json', (error, fileContents) => {
        let arrayOfEvents = JSON.parse(fileContents);
        let itemPosition = 0;
        let i = 0;
        for (event of arrayOfEvents) {
            if (event["eventId"] === body["eventId"]) {
                itemPosition = i;
                break;
            }
            i++;
        }
        if (itemPosition == 0){
            res.send({ "error": "eventId doesn't exist" });
            console.log("eventId doesn't exist");
        }else{
            arrayOfEvents[itemPosition] = body;
            fs.writeFile(`event.json`, JSON.stringify(arrayOfEvents), () =>{
                res.send({ "listOfEventsUpdated": true });
                console.log({ "listOfEventsUpdated": true });
            });
        }
    });
});

server.delete("/event/:idFromParam", (req, res) => {
    console.log("delete request received from /event/pathParam");
    const eventFromParam = req.params.idFromParam;
    fs.readFile('event.json', (error, fileContents) => {
        let arrayOfEvents = JSON.parse(fileContents);
        ifFound = false;
        let i = 0;
        for (event of arrayOfEvents) {
            if (event["eventId"] === eventFromParam) {
               ifFound = true;
               break;
            }
            i++;
        }
        if (!ifFound){
            res.send({ "error": "EventId doesn't exist!" });
            console.log({ "error": "EventId doesn't exist!" });
        }else{
            arrayOfEvents.splice(i,1);
            console.log(arrayOfEvents);
            fs.writeFile(`event.json`, JSON.stringify(arrayOfEvents), () =>{
                console.log(`arrayOfEvents.json updated`.magenta);
                res.send({ "eventDeleted": true });
                console.log({ "eventDeleted": true });
            });
        }
    });
});


/*


eventExample = {
    "name": "Field Day",
    "start": "1591135200000",
    "end": "1591480800000",
    "description": "Expanded again to a two-day event (after a year as a one-dayer), Field Day continues to be cooler than a cucumber with a hipster beard and an ironic tattoo. It’s a great place to get day-drunk on craft beer after lining your stomach with the latest vegan food in the super-chill Village Green area.",
    "tickets": [
        {
            "name": "General Admission",
            "quantity": "5000",
            "price": "10"
        },
        {
            "name": "Early Bird",
            "quantity": "2000",
            "price": "8"
        }
    ],
    "country": "spain",
    "currency": "euro",
    "returnPolicy": "none",
    "public": true,
    "type": "festival",
    "theme": "music",
    "eventId": "2"
}


*/


server.listen(3000, () => {
    console.log(`i'm listening, hun. i <3 u 3000`.red)
})// port 3000 usually used for express