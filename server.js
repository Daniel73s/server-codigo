// configuracion con https;
const app = require('./app');
const https=require('https');
const fs=require('fs');
const PUERTO=443;

// const port = process.env.PORT || 3000;

const server = https.createServer({
    cert:fs.readFileSync('certificate.crt'),
    key:fs.readFileSync('llave.key')
},app);

server.listen(PUERTO);






//Configuracion anterior

// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);