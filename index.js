
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


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



/*
const express = require("express"); // importa o express

const server = express(); // cria uma variável chamada server que chama a função express

server.use(express.json()); // faz com que o express entenda JSON
const clientes = [];

server.get("/clientes", (req, res) => {
  console.log("teste");
  return res.json(clientes);
}); // Cria a rota /teste com o método GET, o console.log retornará no terminal ‘teste’ caso tenha executado com sucesso.


server.post("/clientes", (req, res) => {
  const { name } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
  clientes.push(name);

  return res.json(clientes); // retorna a informação da variável geeks
});

server.put('/clientes/:index', (req, res) => {
    const { index } = req.params; // recupera o index com os dados
    const { name } = req.body;
    
    clientes[index] = name; // sobrepõe o index obtido na rota de acordo com o novo valor
    
    return res.json(clientes);
    })


    server.delete('/clientes/:index', (req, res) => {
        const { index } = req.params; // recupera o index com os dados
        
        clientes.splice(index, 1); // percorre o vetor até o index selecionado e deleta uma posição no array
        
        return res.send();
        });


server.listen(3333); // faz com que o servidor seja executado na porta 3000 do seu localhost:3000

/*
const express = require('express')

const port = 3333
const app = express()
app.get('/', (req, res) => {
    res.send('Hello world!')
})
app.listen(port, () => console.log(`App running on http://localhost:${port}`))
*/
