// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paysolutions'
});

app.use(bodyParser.json());

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados');
});

app.use(bodyParser.json());

// Endpoint para autenticação
app.post('/authenticate', (req, res) => {
  const { usuario, senha } = req.body;
  const query = 'SELECT * FROM logins WHERE usuario = ? AND senha = ?';

  db.query(query, [usuario, senha], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao autenticar o usuário' });
    } else if (result.length > 0) {
      res.status(200).send({ message: 'Usuário autenticado com sucesso' });
    } else {
      res.status(401).send({ message: 'Email ou senha incorretos' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const funcionariosRoutes = require('./ControlleFuncionarios');

app.use('/ControllerFuncionarios', funcionariosRoutes);