const express = require('express');
const router = express.Router();
const db = require('../middleware/Authenticate/server.js'); // Importar a conexão do banco de dados

router.post('/', (req, res) => {
  const { codigo, data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, email, id, agencia, conta, bairro, uf, cep, pais, cargo } = req.body;

  const queryFuncionario = 'INSERT INTO funcionarios (codigo, data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const queryEndereco = 'INSERT INTO enderecos (id_funcionario, bairro, uf, cep, pais, cidade) VALUES (?, ?, ?, ?, ?)';
  const queryCargo = 'INSERT INTO cargos (id_funcionario, cargo) VALUES (?, ?)';
  const queryBanco = 'INSERT INTO banco (id, agencia, conta, codigo_funcionario) VALUES (?, ?, ?)';

  db.query(queryFuncionario, [codigo, data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar o funcionário' });
    } else {
      const id_funcionario = result.insertId; // Obter o ID do novo funcionário

      // Inserir o endereço
      db.query(queryEndereco, [id_funcionario, bairro, uf, cep, pais, cidade], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Erro ao criar o endereço' });
        } else {
          // Inserir o cargo
          db.query(queryCargo, [id_funcionario, cargo], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Erro ao criar o cargo' });
            } else {
              // Inserir os dados do banco
              db.query(queryBanco, [id, id_funcionario, agencia, conta], (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Erro ao criar os dados do banco' });
                } else {
                  res.status(200).json({ message: 'Funcionário, endereço, cargo e dados do banco criados com sucesso' });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;