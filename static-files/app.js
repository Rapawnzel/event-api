// colors lib
let colors = require('colors');
// http + https lib
const https = require('https');
const http = require('http');
// file system lib
const fs = require('fs');
// cors lib
const cors = require('cors');
// body parser lib
const bodyParser = require('body-parser');


const express = require ('express');

const servidor = express();

servidor.use(express.static('public'));

servidor.listen(80, () => {
    console.log(`i'm listening, hun. i <3 u 3000`);
})