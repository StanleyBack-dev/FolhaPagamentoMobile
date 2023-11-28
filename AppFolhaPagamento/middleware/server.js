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

  // Iniciar o servidor após a conexão com o banco de dados estar estabelecida
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});


// Endpoint para obter a lista de funcionários
app.get('/funcionarios', (req, res) => {
  const query = 'SELECT nome, cpf, telefone, email, sexo, data_nascimento, salario FROM funcionarios'; // Adicione os novos campos desejados

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao buscar os funcionários' });
    } else {
      res.status(200).send(result);
    }
  });
});

 // Endpoint para adicionar um novo funcionário
app.post('/adicionarFuncionario', (req, res) => {
  const {nome, cpf, telefone, email, sexo, data_nascimento, salario} = req.body;
  const query = 'INSERT INTO funcionarios (nome, cpf, telefone, email, sexo, data_nascimento, salario) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [nome, cpf, telefone, email, sexo, data_nascimento, salario], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao adicionar funcionário' });
    } else {
      if (result.affectedRows > 0) {
        res.status(201).send({ message: 'Funcionário adicionado com sucesso' });
      } else {
        res.status(500).send({ error: 'Erro ao adicionar funcionário' });
      }
    }
  });
});

app.put('/funcionarios/:cpf', (req, res) => {
  const { cpf } = req.params;
  const novosDados = req.body;

  const camposAtualizacao = Object.keys(novosDados).map((chave) => `${chave}=?`).join(', ');
  const valores = [...Object.values(novosDados), cpf];

  const query = `UPDATE funcionarios SET ${camposAtualizacao} WHERE cpf=?`;

  db.query(query, valores, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao atualizar funcionário', message: err.message });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send({ message: 'Funcionário atualizado com sucesso' });
      } else {
        res.status(404).send({ message: 'Funcionário não encontrado ou nenhum dado alterado' });
      }
    }
  });
});



app.delete('/funcionarios/:cpf', (req, res) => {
  const { cpf } = req.params;

  const query = 'DELETE FROM funcionarios WHERE cpf=?';

  db.query(query, [cpf], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao deletar funcionário', message: err.message });
    } else {
      res.status(200).send({ message: 'Funcionário deletado com sucesso' });
    }
  });
});




// Exporte a conexão para ser utilizada em outros arquivos
module.exports = db;
