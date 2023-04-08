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


/*
connection.query('CREATE DATABASE mecanitech2', function (err, result) {
  if (err) throw err;
  console.log("Banco de dados criado com sucesso!");
});

connection.end();

*/
module.exports = connection;
