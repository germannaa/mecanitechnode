const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');


const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'mecanitech',

});

module.exports = connection;
