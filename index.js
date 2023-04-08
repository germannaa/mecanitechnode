
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());

const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, cpf, senha, telefone,  email } = req.body;

  connection.query('INSERT INTO clientes (nome, cpf, senha, telefone,  email) VALUES (?, ?, ?, ?,  ?)', [nome, cpf, senha, telefone,  email], (error, results) => {
    if (error) {
      throw error;
    }

    res.send(`Cliente ${nome} adicionado com sucesso!`);
  });
});

app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM clientes WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.send(`Cliente com id ${id} removido com sucesso!`);
  });
});

app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const { nome, cpf, senha, telefone, email } = req.body;

  connection.query('UPDATE clientes SET nome = ?, cpf = ?, senha = ?, telefone = ?, email = ? WHERE id = ?', [nome, cpf, senha, telefone, email, id], (error, results) => {
    if (error) {
      throw error;
    }

    res.send(`Cliente com id ${id} atualizado com sucesso!`);
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

