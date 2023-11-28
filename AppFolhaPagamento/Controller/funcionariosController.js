// Importe a conexão com o banco de dados
const db = require('../middleware/server.js');

const { Router } = require('express');
const router = Router();

// Criar um novo funcionário (CREATE)
router.post('/', (req, res) => {
  const { data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, cnh, email } = req.body;
  const query = 'INSERT INTO funcionarios (data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, cnh, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  // Utilize a função query diretamente da conexão do banco de dados (db)
  db.query(query, [data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, cnh, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar o funcionário' });
    } else {
      res.status(200).json({ message: 'Funcionário criado com sucesso' });
    }
  });
});

// Ler funcionários (READ)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM funcionarios';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar os funcionários' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Atualizar um funcionário (UPDATE)
router.put('/:id', (req, res) => {
  const { codigo, data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, cnh, email } = req.body;
  const query = 'UPDATE funcionarios SET codigo = ?, data_admissao = ?, nome = ?, cpf = ?, telefone = ?, rg = ?, data_nascimento = ?, estado_civil = ?, PIS = ?, numero_carteira_trabalho = ?, sexo = ?, cnh = ?, email = ? WHERE id = ?';
  
  // Utilize a função query diretamente da conexão do banco de dados (db)
  db.query(query, [codigo, data_admissao, nome, cpf, telefone, rg, data_nascimento, estado_civil, PIS, numero_carteira_trabalho, sexo, cnh, email, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
    } else {
      res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
    }
  });
});

// Deletar um funcionário (DELETE)
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM funcionarios WHERE id = ?';
  
  // Utilize a função query diretamente da conexão do banco de dados (db)
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar o funcionário' });
    } else {
      res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    }
  });
});

module.exports = router;
