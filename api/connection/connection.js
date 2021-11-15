const {Pool} = require('pg');

const configBD = {
    user:'postgres',
    host:'localhost',
    password:'postgres',
    database:'nombre de base de datos'
 }

const pool = new Pool(configBD);

module.exports = pool;
