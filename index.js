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

//Consultar placas dos veículos daquele cpf
app.get("/veiculos/:cpf", (req, res) => {
  const { cpf } = req.params;
  connection.query(
    "SELECT placa FROM veículos WHERE cpf_cliente = ?",
    [cpf],
    (error, results) => {
      if (error) {
        throw error;
      }
      const placas = results.map((item) => item.placa);
      res.send(placas);
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

// FUNCIONARIOS

// GET - listar todos os funcionários
app.get("/funcionarios", (req, res) => {
  connection.query("SELECT * FROM funcionario", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// GET - buscar funcionário pelo id_funcionario
app.get("/funcionarios/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM funcionario WHERE id_funcionario = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

// POST - criar novo funcionário
app.post("/funcionarios", (req, res) => {
  const { nome, cargo, data_admissao, salario, cpf } = req.body;

  connection.query(
    "INSERT INTO funcionario (nome, cargo, data_admissao, salario, cpf) VALUES (?, ?, ?, ?, ?)",
    [nome, cargo, data_admissao, salario, cpf],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Funcionário ${nome} adicionado com sucesso!`);
    }
  );
});

// DELETE - remover funcionário pelo id_funcionario
app.delete("/funcionarios/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM funcionario WHERE id_funcionario = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Funcionário com id ${id} removido com sucesso!`);
    }
  );
});

// PUT - atualizar funcionário pelo id_funcionario
app.put("/funcionarios/:id", (req, res) => {
  const id = req.params.id;
  const { nome, cargo, data_admissao, salario, cpf } = req.body;

  connection.query(
    "UPDATE funcionario SET nome = ?, cargo = ?, data_admissao = ?, salario = ?, cpf = ? WHERE id_funcionario = ?",
    [nome, cargo, data_admissao, salario, cpf, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Funcionário com id ${id} atualizado com sucesso!`);
    }
  );
});

//ORDENS DE SERVICO

// GET - listar todas as ordens de serviço
app.get("/ordensdeservico", (req, res) => {
  connection.query(
    "SELECT o.id_os,o.cpf_cliente,(SELECT nome FROM clientes WHERE cpf = o.cpf_cliente) AS nome_cliente, o.placa_veiculo, (SELECT marca FROM veículos WHERE placa = o.placa_veiculo) AS marca_veiculo, (SELECT modelo FROM veículos WHERE placa = o.placa_veiculo) AS modelo_veiculo, o.id_funcionario, (SELECT nome FROM funcionario WHERE id_funcionario = o.id_funcionario) AS nome_funcionario, o.data_inicio, o.data_termino, o.valor_total, o.status, (SELECT GROUP_CONCAT(s.nome_servico SEPARATOR ', ') FROM os_servicos os INNER JOIN servicos s ON os.id_servico = s.id_servico WHERE os.id_os = o.id_os) AS servicos_realizados FROM ordensdeservico o",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.get("/ordemdeservico", (req, res) => {
  connection.query("SELECT * FROM ordensdeservico", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// GET - buscar ordem de serviço pelo id_os
app.get("/ordensdeservico/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM ordensdeservico WHERE id_os = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

// POST - criar nova ordem de serviço
app.post("/ordensdeservico", (req, res) => {
  const {
    cpf_cliente,
    placa_veiculo,
    id_funcionario,
    data_inicio,
    data_termino,
    valor_total,
    status,
    servicos,
  } = req.body;

  connection.query(
    "INSERT INTO ordensdeservico (cpf_cliente, placa_veiculo, id_funcionario, data_inicio, data_termino, valor_total, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      cpf_cliente,
      placa_veiculo,
      id_funcionario,
      data_inicio,
      data_termino,
      valor_total,
      status,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }

      const id_os = results.insertId;

      const values = servicos.map((id_servico) => [id_os, id_servico]);

      connection.query(
        "INSERT INTO os_servicos (id_os, id_servico) VALUES ?",
        [values],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.send("Ordem de serviço adicionada com sucesso!");
        }
      );
    }
  );
});

// DELETE - remover ordem de serviço pelo id_os
app.delete("/ordensdeservico/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM ordensdeservico WHERE id_os = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Ordem de serviço com id ${id} removida com sucesso!`);
    }
  );
});

// PUT - atualizar ordem de serviço pelo id_os
app.put("/ordensdeservico/:id", (req, res) => {
  const id = req.params.id;
  const {
    cpf_cliente,
    placa_veiculo,
    id_funcionario,
    data_inicio,
    data_termino,
    valor_total,
    status,
  } = req.body;

  connection.query(
    "UPDATE ordensdeservico SET cpf_cliente = ?, placa_veiculo = ?, id_funcionario = ?, data_inicio = ?, data_termino = ?, valor_total = ?, status = ? WHERE id_os = ?",
    [
      cpf_cliente,
      placa_veiculo,
      id_funcionario,
      data_inicio,
      data_termino,
      valor_total,
      status,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`Ordem de serviço com id ${id} atualizada com sucesso!`);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
