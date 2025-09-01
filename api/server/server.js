// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_NAME = '2ggrupo5',
  DB_USER = 'postgres',
  DB_PASS = '000',
  JWT_SECRET = 'troque_este_segredo_agora',
  PORT = 3000
} = process.env;

const db = pgp({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
});

const app = express();
app.use(cors());              // se quiser restringir: cors({ origin: 'http://localhost:3000' })
app.use(express.json());

// ---------------- HELPERS JWT / AUTORIZAÇÃO ----------------

function gerarToken(payload) {
  // payload: { id, type: 'empresa'|'funcionario', empresa_id? }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 1, mensagem: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ erro: 1, mensagem: 'Token inválido ou expirado' });
    req.user = decoded; // ex: { id, type, empresa_id }
    next();
  });
}

async function obterEmpresaCallerId(req) {
  // se user.type === 'empresa' retorna id da empresa
  // se user.type === 'funcionario' retorna empresa_id embutido no token (quando logou)
  if (!req.user) return null;
  if (req.user.type === 'empresa') return req.user.id;
  if (req.user.type === 'funcionario') return req.user.empresa_id || null;
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

// Cadastro funcionário (aberto)
app.post('/cadastrofunc', async (req, res) => {
  try {
    const { nome, email, senha, code, empresa_id = null } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: 1, mensagem: 'nome, email e senha obrigatórios' });

    const hashed = await bcrypt.hash(senha, 10);
    await db.none(
      'INSERT INTO funcionario (nome, email, senha, code, empresa_id) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, hashed, code || null, empresa_id]
    );
    res.status(201).json({ resposta: 'Cadastro feito com sucesso!' });
  } catch (error) {
    console.error('cadastrofunc error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível cadastrar o usuário', detalhe: error.message });
  }
});

// Login funcionário -> retorna token
app.post('/loginfunc', async (req, res) => {
  try {
    const { email, senha, code } = req.body;
    if (!email || !senha || typeof code === 'undefined') return res.status(400).json({ erro: 1, mensagem: 'email, senha e code obrigatórios' });

    const func = await db.oneOrNone('SELECT * FROM funcionario WHERE email = $1 AND code = $2', [email, code]);
    if (!func) return res.status(401).json({ erro: 2, mensagem: 'Email ou código incorreto.' });

    const ok = await bcrypt.compare(senha, func.senha);
    if (!ok) return res.status(401).json({ erro: 2, mensagem: 'Senha incorreta.' });

    const token = gerarToken({ id: func.id, type: 'funcionario', empresa_id: func.empresa_id });
    res.json({ resposta: 'Login de funcionário realizado com sucesso', token });
  } catch (error) {
    console.error('loginfunc error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno no servidor.', detalhe: error.message });
  }
});

// Cadastro empresa (aberto)
app.post('/cadastroempr', async (req, res) => {
  try {
    const { nome, email, senha, cnpj, code } = req.body;
    if (!nome || !email || !senha || !cnpj) return res.status(400).json({ erro: 1, mensagem: 'nome, email, senha e cnpj obrigatórios' });

    const hashed = await bcrypt.hash(senha, 10);
    await db.none('INSERT INTO empresa (nome, email, senha, cnpj, code) VALUES ($1, $2, $3, $4, $5)', [nome, email, hashed, cnpj, code || null]);
    res.status(201).json({ resposta: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('cadastroempr error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível cadastrar a empresa', detalhe: error.message });
  }
});

// Login empresa -> retorna token
app.post('/loginempr', async (req, res) => {
  try {
    const { email, senha, code } = req.body;
    if (!email || !senha || typeof code === 'undefined') return res.status(400).json({ erro: 1, mensagem: 'email, senha e code obrigatórios' });

    const empresa = await db.oneOrNone('SELECT * FROM empresa WHERE email = $1 AND code = $2', [email, code]);
    if (!empresa) return res.status(401).json({ erro: 2, mensagem: 'Email ou código incorreto.' });

    const ok = await bcrypt.compare(senha, empresa.senha);
    if (!ok) return res.status(401).json({ erro: 2, mensagem: 'Senha incorreta.' });

    const token = gerarToken({ id: empresa.id, type: 'empresa' });
    res.json({ resposta: 'Login de empresa realizado com sucesso', token });
  } catch (error) {
    console.error('loginempr error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno no servidor.', detalhe: error.message });
  }
});

// ---------------- POSTES ----------------

// Criar poste (PROTEGIDO) - token required
app.post('/postes', autenticarToken, async (req, res) => {
  try {
    const { latitude, longitude, empresa_id: bodyEmpresaId, status } = req.body;
    if (latitude == null || longitude == null) return res.status(400).json({ erro: 1, mensagem: 'latitude e longitude obrigatórios' });

    // identificar empresa dona: prioridade ao token
    const callerEmpresaId = await obterEmpresaCallerId(req);
    const ownerEmpresaId = callerEmpresaId || bodyEmpresaId;
    if (!ownerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Empresa dona não identificada' });

    const novo = await db.one(
      'INSERT INTO postes (latitude, longitude, empresa_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [latitude, longitude, ownerEmpresaId, status || 'ativo']
    );
    res.status(201).json({ mensagem: 'Poste criado com sucesso!', poste: novo });
  } catch (error) {
    console.error('postes create error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível criar o poste', detalhe: error.message });
  }
});

// Alterar status do poste (PROTEGIDO) - caller must be owner or associated
app.put('/postes/alterar-status', autenticarToken, async (req, res) => {
  try {
    const { poste_id, novo_status } = req.body;
    if (!poste_id || !novo_status) return res.status(400).json({ erro: 1, mensagem: 'poste_id e novo_status obrigatórios' });

    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const autorizado = await db.oneOrNone(
      `SELECT 1 FROM postes p LEFT JOIN empresas_associadas ea ON p.id = ea.poste_id
       WHERE p.id = $1 AND (p.empresa_id = $2 OR ea.empresa_id = $2)`,
      [poste_id, callerEmpresaId]
    );
    if (!autorizado) return res.status(403).json({ erro: 1, mensagem: 'Você não tem permissão para alterar o status deste poste' });

    await db.none('UPDATE postes SET status = $1 WHERE id = $2', [novo_status, poste_id]);
    res.json({ mensagem: 'Status do poste atualizado com sucesso!' });
  } catch (error) {
    console.error('alterar-status error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível atualizar o status', detalhe: error.message });
  }
});

// Listar postes de uma empresa (PROTEGIDO) - token must match requested empresa_id
app.get('/empresas/:empresa_id/postes', autenticarToken, async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId || Number(callerEmpresaId) !== Number(empresa_id)) {
      return res.status(403).json({ erro: 1, mensagem: 'Acesso negado: token não corresponde à empresa solicitada' });
    }

    const postes = await db.any(
      `SELECT DISTINCT p.id, p.latitude, p.longitude, p.status, p.empresa_id,
       CASE WHEN p.empresa_id = $1 THEN 'dono' ELSE 'associado' END AS tipo_acesso
       FROM postes p
       LEFT JOIN empresas_associadas ea ON p.id = ea.poste_id
       WHERE p.empresa_id = $1 OR ea.empresa_id = $1`,
      [empresa_id]
    );
    res.json(postes);
  } catch (error) {
    console.error('empresas/:id/postes error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno do servidor', detalhe: error.message });
  }
});

// ---------------- EMPRESAS ASSOCIADAS ----------------

// Associa empresa a poste (PROTEGIDO) - only owner can associate
app.post('/postes/associar-empresa', autenticarToken, async (req, res) => {
  try {
    const { poste_id, empresa_id } = req.body;
    if (!poste_id || !empresa_id) return res.status(400).json({ erro: 1, mensagem: 'poste_id e empresa_id obrigatórios' });

    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const poste = await db.oneOrNone('SELECT empresa_id FROM postes WHERE id = $1', [poste_id]);
    if (!poste) return res.status(404).json({ erro: 1, mensagem: 'Poste não encontrado' });
    if (Number(poste.empresa_id) !== Number(callerEmpresaId)) return res.status(403).json({ erro: 1, mensagem: 'Somente a empresa dona pode associar outras empresas' });

    await db.none('INSERT INTO empresas_associadas (poste_id, empresa_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [poste_id, empresa_id]);
    res.status(201).json({ mensagem: 'Empresa associada com sucesso!' });
  } catch (error) {
    console.error('associar-empresa error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível associar a empresa', detalhe: error.message });
  }
});

// Listar empresas associadas a um poste (PROTEGIDO) - owner or associated can view
app.get('/postes/:poste_id/empresas-associadas', autenticarToken, async (req, res) => {
  try {
    const { poste_id } = req.params;
    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const allowed = await podeAcessarPoste(poste_id, callerEmpresaId);
    if (!allowed) return res.status(403).json({ erro: 1, mensagem: 'Acesso negado ao poste' });

    const empresas = await db.any(
      `SELECT e.id, e.nome, e.email, e.cnpj FROM empresas_associadas ea JOIN empresa e ON ea.empresa_id = e.id WHERE ea.poste_id = $1`,
      [poste_id]
    );
    res.json(empresas);
  } catch (error) {
    console.error('empresas-associadas error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Erro interno do servidor', detalhe: error.message });
  }
});

// ---------------- NOTIFICAÇÕES ----------------

// Criar notificação (PROTEGIDO) - owner or associated can create
app.post('/notificacoes', autenticarToken, async (req, res) => {
  try {
    const { texto, data, status = 'pendente', id_do_poste } = req.body;
    if (!texto || !id_do_poste) return res.status(400).json({ erro: 1, mensagem: 'texto e id_do_poste obrigatórios' });

    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const allowed = await podeAcessarPoste(id_do_poste, callerEmpresaId);
    if (!allowed) return res.status(403).json({ erro: 1, mensagem: 'Você não tem permissão para criar notificação neste poste' });

    const nova = await db.one(
      'INSERT INTO notificacoes (texto, data, status, id_do_poste) VALUES ($1, $2, $3, $4) RETURNING *',
      [texto, data || null, status, id_do_poste]
    );
    res.status(201).json({ resposta: 'Notificação criada com sucesso!', notificacao: nova });
  } catch (error) {
    console.error('notificacoes create error:', error);
    res.status(500).json({ erro: 1, mensagem: 'Não foi possível criar notificação', detalhe: error.message });
  }
});

// Editar notificação (PROTEGIDO) - only owner/assoc of poste can edit
app.put('/notificacoes/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, status, data } = req.body;

    const notif = await db.oneOrNone('SELECT id, id_do_poste FROM notificacoes WHERE id = $1', [id]);
    if (!notif) return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });

    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const allowed = await podeAcessarPoste(notif.id_do_poste, callerEmpresaId);
    if (!allowed) return res.status(403).json({ erro: 1, mensagem: 'Você não tem permissão para editar esta notificação' });

    const result = await db.result('UPDATE notificacoes SET texto = $1, data = $2, status = $3 WHERE id = $4', [texto, data, status, id]);
    if (result.rowCount === 0) return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });

    res.json({ resposta: 'Notificação atualizada com sucesso!' });
  } catch (error) {
    console.error('notificacoes edit error:', error);
    res.status(500).json({ erro: 2, mensagem: 'Não foi possível atualizar a notificação', detalhe: error.message });
  }
});

// Deletar notificação (PROTEGIDO)
app.delete('/notificacoes/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await db.oneOrNone('SELECT id, id_do_poste FROM notificacoes WHERE id = $1', [id]);
    if (!notif) return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });

    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const allowed = await podeAcessarPoste(notif.id_do_poste, callerEmpresaId);
    if (!allowed) return res.status(403).json({ erro: 1, mensagem: 'Você não tem permissão para excluir esta notificação' });

    const result = await db.result('DELETE FROM notificacoes WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ erro: 1, mensagem: 'Notificação não encontrada' });

    res.json({ resposta: 'Notificação deletada com sucesso!' });
  } catch (error) {
    console.error('notificacoes delete error:', error);
    res.status(500).json({ erro: 2, mensagem: 'Não foi possível deletar a notificação', detalhe: error.message });
  }
});

// Listar notificações de um poste (PROTEGIDO)
app.get('/postes/:id/notificacoes', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const callerEmpresaId = await obterEmpresaCallerId(req);
    if (!callerEmpresaId) return res.status(403).json({ erro: 1, mensagem: 'Token inválido / sem empresa associada' });

    const allowed = await podeAcessarPoste(id, callerEmpresaId);
    if (!allowed) return res.status(403).json({ erro: 1, mensagem: 'Acesso negado ao poste' });

    const rows = await db.any('SELECT id, texto, data, status FROM notificacoes WHERE id_do_poste = $1 ORDER BY data DESC', [id]);
    res.json(rows);
  } catch (error) {
    console.error('postes notificacoes list error:', error);
    res.status(500).json({ erro: 'Falha ao listar notificações', detalhe: error.message });
  }
});

// ---------------- ROTAS DE TESTE ----------------
// (estas rotas requerem token - para debugging)
app.get('/testefunc', autenticarToken, async (req, res) => {
  const rows = await db.any('SELECT id, nome, email, code, empresa_id FROM funcionario');
  res.json(rows);
});

app.get('/testeempr', autenticarToken, async (req, res) => {
  const rows = await db.any('SELECT id, nome, email, cnpj, code FROM empresa');
  res.json(rows);
});

app.get('/testenotificacao', autenticarToken, async (req, res) => {
  const rows = await db.any('SELECT * FROM notificacoes ORDER BY data DESC');
  res.json(rows);
});

// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
