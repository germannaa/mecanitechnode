const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();
app.use(cors());

const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//CLIENTES

app.get("/clientes", (req, res) => {
  connection.query("SELECT * FROM clientes", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/clientes", (req, res) => {
  const { nome, cpf, senha, telefone, email } = req.body;

  connection.query(
    "INSERT INTO clientes (nome, cpf, senha, telefone,  email) VALUES (?, ?, ?, ?,  ?)",
    [nome, cpf, senha, telefone, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Cliente ${nome} adicionado com sucesso!`);
    }
  );
});

app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM clientes WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Cliente com id ${id} removido com sucesso!`);
    }
  );
});

app.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const { nome, cpf, senha, telefone, email } = req.body;

  connection.query(
    "UPDATE clientes SET nome = ?, cpf = ?, senha = ?, telefone = ?, email = ? WHERE id = ?",
    [nome, cpf, senha, telefone, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Cliente com id ${id} atualizado com sucesso!`);
    }
  );
});

//VEICULOS

// GET - listar todos os veículos, e associar com o nome do Cliente pelo CPF
app.get("/veiculos", (req, res) => {
  connection.query(
    "SELECT veículos.*, clientes.nome AS nome_cliente FROM veículos JOIN clientes ON veículos.cpf_cliente = clientes.cpf",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

// POST - criar novo veículo associando ao cpf do cliente
app.post("/veiculos", (req, res) => {
  const { placa, marca, modelo, ano, kilometragem, cpf_cliente } = req.body;

  connection.query(
    "INSERT INTO veículos (placa, marca, modelo, ano, kilometragem, cpf_cliente) VALUES (?, ?, ?, ?, ?, ?)",
    [placa, marca, modelo, ano, kilometragem, cpf_cliente],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Veículo ${placa} adicionado com sucesso!`);
    }
  );
});

// DELETE - remover veículo pela placa

app.delete("/veiculos/:placa", (req, res) => {
  const placa = req.params.placa;

  connection.query(
    "DELETE FROM veículos WHERE placa = ?",
    [placa],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Veículo com placa ${placa} removido com sucesso!`);
    }
  );
});

// PUT - atualizar veículo pela placa
app.put("/veiculos/:placa", (req, res) => {
  const id = req.params.placa;
  const { placa, marca, modelo, ano, kilometragem, cpf_cliente } = req.body;

  connection.query(
    "UPDATE veículos SET placa = ?, marca = ?, modelo = ?, ano = ?, kilometragem = ?, cpf_cliente = ? WHERE placa = ?",
    [placa, marca, modelo, ano, kilometragem, cpf_cliente, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.send(`Veículo com placa ${placa} atualizado com sucesso!`);
    }
  );
});


// SERVICOS

// GET - listar todos os serviços
app.get("/servicos", (req, res) => {
  connection.query("SELECT * FROM servicos", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// POST - criar novo serviço
app.post("/servicos", (req, res) => {
  const { nome_servico, descricao, valor_cobrado, pecas_usadas } = req.body;

  connection.query(
    "INSERT INTO servicos (nome_servico, descricao, valor_cobrado, pecas_usadas) VALUES (?, ?, ?, ?)",
    [nome_servico, descricao, valor_cobrado, pecas_usadas],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Serviço ${nome_servico} adicionado com sucesso!`);
    }
  );
});

// DELETE - remover serviço pelo id_servico
app.delete("/servicos/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM servicos WHERE id_servico = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Serviço com id ${id} removido com sucesso!`);
    }
  );
});

// PUT - atualizar serviço pelo id_servico
app.put("/servicos/:id", (req, res) => {
  const id = req.params.id;
  const { nome_servico, descricao, valor_cobrado, pecas_usadas } = req.body;

  connection.query(
    "UPDATE servicos SET nome_servico = ?, descricao = ?, valor_cobrado = ?, pecas_usadas = ? WHERE id_servico = ?",
    [nome_servico, descricao, valor_cobrado, pecas_usadas, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Serviço com id ${id} atualizado com sucesso!`);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
