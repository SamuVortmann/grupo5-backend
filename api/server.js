// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const jwt = require('jsonwebtoken');

const  DB_HOST = 'localhost';
const  DB_PORT = 5432;
const  DB_NAME = 'visux';
const  DB_USER = 'bruno';
const  DB_PASS = '1234';
const JWT_SECRET = "90d0af04bc640175822155f4b675b977a16633eda4b3005da54a0182cac641d1"

const  PORT = 3001;


const db = pgp({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
});

const app = express();
app.use(cors());
app.use(express.json());


// ---------------- HELPERS JWT ----------------

function gerarToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 1, mensagem: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ erro: 1, mensagem: 'Token inválido ou expirado' });
    req.user = decoded;
    next();
  });
}

async function obterEmpresaCallerId(req) {
  if (!req.user) return null;
  if (req.user.type === 'empresa') return req.user.id;
  return null;
}

async function podeAcessarPoste(poste_id, callerEmpresaId) {
  if (!callerEmpresaId) return false;
  const poste = await db.oneOrNone('SELECT empresa_id FROM postes WHERE id = $1', [poste_id]);
  if (!poste) return false;
  if (Number(poste.empresa_id) === Number(callerEmpresaId)) return true;
  const assoc = await db.oneOrNone(
    'SELECT 1 FROM empresas_associadas WHERE poste_id = $1 AND empresa_id = $2',
    [poste_id, callerEmpresaId]
  );
  return !!assoc;
}

// ---------------- AUTH / CADASTRO ----------------

// Cadastro empresa
app.post('/cadastroempresa', async (req, res) => {
  try {
    const { nome, email, senha, cnpj, code } = req.body;
    if (!nome || !email || !senha || !cnpj) return res.status(400).json({ erro: 1, mensagem: 'nome, email, senha e cnpj obrigatórios' });

    await db.none('INSERT INTO empresas (nome, email, senha, cnpj, code) VALUES ($1, $2, $3, $4, $5)', [nome, email, senha, cnpj, code || null]);
    res.status(201).json({ resposta: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('cadastroempr error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível cadastrar a empresa', detalhe: error.message });
  }
});


// Login empresa
app.post('/loginempresas', async (req, res) => {
  try {
    console.log(req.body);
    const { email, senha } = req.body;

    console.log(req.body);
    if (!email || !senha) return res.status(400).json({ erro: 1, mensagem: 'email, senha obrigatórios' });

    const empresa = await db.oneOrNone('SELECT * FROM empresas WHERE email = $1', [email]);

    if (!empresa) return res.status(401).json({ erro: 2, mensagem: 'Email incorreto.' });

    if (senha !== empresa.senha) return res.status(401).json({ erro: 2, mensagem: 'Senha incorreta.' });

    const token = gerarToken({ id: empresa.id, type: 'empresa' });
    // res.json({ resposta: 'Login de empresa realizado com sucesso', token });
    res.json({ empresa: empresa})
  } catch (error) {
    console.error('loginEmpresas error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno no servidor.', detalhe: error.message });
  }
});

// ---------------- RESTANTE DO CÓDIGO ----------------
// (rotas de postes, notificações, associações, testes, etc.)
// Mantém exatamente igual ao seu último server.js

// ---------------- NOTIFICAÇÕES ----------------

// Criar notificação (ABERTO)
app.post('/criarnotificacao', async (req, res) => {
  console.log(req.body);
  try {
    const { descricao, status, id_poste_associado } = req.body;

    if (!descricao || !id_poste_associado) {
      return res.status(400).json({ erro: 1, mensagem: 'descricao e id_poste_associado obrigatórios' });
    }

    const nova = await db.one(
      'INSERT INTO notificacoes (descricao, status, id_poste_associado) VALUES ($1, $2, $3) RETURNING *',
      [descricao, status, id_poste_associado]
    );

    res.status(201).json({ resposta: 'Notificação criada com sucesso!', notificacao: nova });
  } catch (error) {
    console.error('notificacoes create error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível criar notificação', detalhe: error.message });
  }

});

// Editar notificação (ABERTO)
app.put('/editarnotificacao/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, status, data } = req.body;

    const result = await db.result(
      'UPDATE notificacoes SET texto = $1, data = $2, status = $3 WHERE id = $4',
      [texto, data || null, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });
    }

    res.json({ resposta: 'Notificação atualizada com sucesso!' });
  } catch (error) {
    console.error('notificacoes edit error:', error);
    res.status(500).json({ erro: 2, mensagem: 'Não foi possível atualizar a notificação', detalhe: error.message });
  }
});

// Deletar notificação (ABERTO)
app.delete('/deletarnotificacao/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.result('DELETE FROM notificacoes WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });
    }

    res.json({ resposta: 'Notificação deletada com sucesso!' });
  } catch (error) {
    console.error('notificacoes delete error:', error);
    res.status(500).json({ erro: 2, mensagem: 'Não foi possível deletar a notificação', detalhe: error.message });
  }
});

// Listar notificações de um poste (ABERTO)
app.get('/postes/notificacoes', async (req, res) => {
  try {
    const { id_poste } = req.body;

    const rows = await db.any(
      'SELECT * FROM notificacoes WHERE id_poste_associado = $1 ORDER BY data DESC',
      [id_poste]
    );

    res.json(rows);
  } catch (error) {
    console.error('postes notificacoes list error:', error);
    res.status(500).json({ erro: 'Falha ao listar notificações', detalhe: error.message });
  }
});

//Listar todos os postes
app.post('/mapa/postes', async (req, res) => {
  try {
    const {id_empresa} = req.body;
    const postes = await db.any('SELECT DISTINCT p.* FROM postes p LEFT JOIN empresas_associadas_postes eap ON p.id = eap.id_poste WHERE p.id_empresa_dona = $1 OR eap.id_empresa = $1;', [id_empresa]);

    res.status(200).json(postes);
  } catch (error) {
    console.error('Erro ao pegar poste:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar poste.' });
  }
});

app.get('/nomeEmpresas', async (req, res) => {
  try {
    
    const idNome = await db.any('SELECT id, nome FROM empresas');

    res.status(201).json(idNome);
  } catch (error) {
    console.error('Erro ao pegar idNome:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar idNome.' });
  }
});


// Criar um novo poste (qualquer um autenticado pode criar)
app.post('/postesCriar', async (req, res) => {
  try {
    const { latitude, longitude, empresa_id, status } = req.body;

    if (!latitude || !longitude || !empresa_id) {
      return res.status(400).json({ erro: 1, mensagem: 'latitude, longitude e empresa_id são obrigatórios.' });
    }

    const novoPoste = await db.one(
      'INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [latitude, longitude, empresa_id, status]
    );

    res.status(201).json(novoPoste);
  } catch (error) {
    console.error('Erro ao criar poste:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao criar poste.' });
  }
});



// Atualizar um poste (qualquer um autenticado pode editar)
app.put('/postes/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, status, empresa_id } = req.body;

    const posteAtualizado = await db.oneOrNone(
      'UPDATE postes SET latitude=$1, longitude=$2, status=$3, empresa_id=$4 WHERE id=$5 RETURNING *',
      [latitude, longitude, status, empresa_id, id]
    );

    if (!posteAtualizado) {
      return res.status(404).json({ erro: 1, mensagem: 'Poste não encontrado.' });
    }

    res.json(posteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar poste:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao atualizar poste.' });
  }
});

// Deletar um poste (qualquer um autenticado pode deletar)
app.delete('/postes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.result('DELETE FROM postes WHERE id = $1 CASCADE' , [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 1, mensagem: 'Poste não encontrado.' });
    }

    res.json({ resposta: 'Poste removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar poste:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao deletar poste.' });
  }
});

// Pegar postes de uma empresa específica
app.post('/empresa/postes', async (req, res) => {
  try {
    const { id_empresa } = req.body;

    const postes = await db.any('SELECT * FROM postes WHERE id_empresa_dona = $1', [id_empresa]);

    res.json(postes);
  } catch (error) {
    console.error('Erro ao pegar postes da empresa:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar postes.' });
  }
});

// Pegar postes específico (geral)
app.post('/postes', async (req, res) => {
  
  try {
    const { id_poste } = req.body;

    const postes = await db.any('SELECT * FROM postes WHERE id = $1', [id_poste]);

    const notificacoes = await db.any('SELECT * FROM notificacoes WHERE id_poste_associado IN ( SELECT id FROM postes WHERE id = $1)', [id_poste]);

    res.json( notificacoes);
  } catch (error) {
    console.error('Erro ao pegar postes da empresa:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar postes.' });
  }
});


// Pegar todas as notificações de todos os postes de uma empresa
app.post('/notificacoes', async (req, res) => {
  try {
    const { id_empresa } = req.body;
    console.log(req.body)

    const notificacoes = await db.any('SELECT * FROM notificacoes WHERE id_poste_associado IN ( SELECT id FROM postes WHERE id_empresa_dona = $1)', [id_empresa]);

    res.json(notificacoes);
  } catch (error) {
    console.error('Erro ao pegar notificações da empresa:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar notificações.' });
  }
});




// Pegar notificações de um poste específico
app.post('/postes/notificacoes', async (req, res) => {
  
  try {
    const { id_poste } = req.body;
    console.log(req.body)

    const notificacoes = await db.any(
      'SELECT * FROM notificacoes WHERE id_poste_associado = $1 ORDER BY data DESC',
      [id_poste]
    );

    res.json(notificacoes);
  } catch (error) {
    console.error('Erro ao pegar notificações do poste:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno ao pegar notificações.' });
  }
});



// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});


