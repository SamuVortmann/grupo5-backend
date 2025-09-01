const pgp = require('pg-promise')();
const express = require('express')

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: '2ggrupo5', // Replace with your database name
    user: 'postgres',         // Replace with your PostgreSQL username
    password: '000'
};

const db = pgp(dbConfig);
const app = express();
app.use(express.json());
const port = 3000


// ----------------- Funcionario ----------------- //

// Cadastra o funcionário
app.post('/cadastrofunc', async (req, res) => {
    try {
        const dados = req.body;

        // Faz o cadastro
        await db.none(
            'INSERT INTO funcionario (nome, email, senha, code) VALUES ($1, $2, $3, $4)',
            [dados.nome, dados.email, dados.senha, dados.code]
        );

        // Retorna se for sucesso
        res.json({ resposta: 'Cadastro feito com sucesso!' });

    } catch (error) {
        console.error('Erro no cadastro:', error);

        // Retorno se for erro
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível cadastrar o usuário'
        });
    }
});

app.post('/loginfunc', async (req, res) => {
    const dados = req.body;

    try {
        const dados = req.body;

        // Faz o login
        const [resposta] = await db.any('SELECT * FROM funcionario WHERE email = $1 and senha = $2 and code= $3', 
        [dados.email, dados.senha, dados.code]);

        // Retorna se for erro
        if (!resposta) {
            res.json({erro: 2,
            mensagem: 'A senha, email ou código único está incorreto.'});
        } 

        // Retorna se for sucesso
        res.json({ resposta: 'Login realizado com sucesso' });

    } catch (error) {
        console.error('Erro no cadastro:', error);
    }
})
    


//-----------Empresa------------//


// cadastra a empresa
app.post('/cadastroempr', async (req, res) => {
    try {
        const dados = req.body;

        // Faz o cadastro
        await db.none(
            'INSERT INTO empresa (nome, email, senha, cnpj, code) VALUES ($1, $2, $3, $4, $5)',
            [dados.nome, dados.email, dados.senha, dados.cnpj, dados.code]
        );

        // Retorna se for sucesso
        res.json({ resposta: 'Cadastro realizado com sucesso!' });

    } catch (error) {
        console.error('Erro no cadastro:', error);

        // Retorno se for erro
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível cadastrar o usuário'
        });
    }
});


//loga a empresa //

app.post('/loginempr', async (req, res) => {
    const dados = req.body;

    try {
        const dados = req.body;

        // Faz o login
        const [resposta] = await db.any(
            'SELECT * FROM empresa WHERE email = $1 and senha = $2 and code= $3', 
            [dados.email, dados.senha, dados.code]
        );
        // Valida
        if (!resposta) {
            res.json({resposta: 'Email, senha ou codigo único está Incorreto'});
        } 

        else {
            // Retorna se for sucesso
            res.json({ resposta: 'Login realizado com sucesso' });
        }

    } catch (error) {
        console.error('Erro no cadastro:', error);

        // Retorno se for erro
        res.status(500).json({
            erro: 2,
            mensagem: 'A senha, email ou código único está incorreto.'
        });
    }
});


//---------------Notificações-------------------//

app.post('/postarnotificacao', async (req, res) => {
    const notificar = req.body; // <-- CORRIGIDO

    try {
        await db.none(
            'INSERT INTO notificacoes (texto, data, status, id_do_poste) VALUES ($1, $2, $3, $4)',
            [notificar.texto, notificar.data, notificar.status, notificar.id_do_poste] // <-- ID do poste é FK
        );

        // Retorna se for sucesso
        res.json({ resposta: 'Cadastro realizado com sucesso!' });

    } catch (error) {
        console.error('Erro no cadastro:', error);

        // Retorno se for erro
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível criar notificação',
            detalhe: error.message // <-- mostra motivo real
        });
    }
});




// Editar notifiacções

app.put('/editarnotificacao/:id', async (req, res) => {
    const { id } = req.params;  // Pega o ID da notificação pela URL
    const { texto, status, data } = req.body; // Agora também pegamos a data

    try {
        // Atualiza o texto, a data e o status da notificação
        const resultado = await db.result(
            'UPDATE notificacoes SET texto = $1, data = $2, status = $3 WHERE id = $4',
            [texto, data, status, id]
        );

        // Se nenhuma linha foi alterada, retorna erro
        if (resultado.rowCount === 0) {
            return res.status(404).json({
                erro: 1,
                mensagem: 'Notificação não encontrada'
            });
        }

        // Sucesso
        res.json({ resposta: 'Notificação atualizada com sucesso!' });

    } catch (error) {
        console.error('Erro ao editar notificação:', error);

        res.status(500).json({
            erro: 2,
            mensagem: 'Não foi possível atualizar a notificação',
            detalhe: error.message
        });
    }
});


app.delete('/deletarnotificacao/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        // Executa a exclusão da notificação
        const resultado = await db.result(
            'DELETE FROM notificacoes WHERE id = $1',
            [id]
        );

        // Se nenhuma linha foi deletada, retorna erro
        if (resultado.rowCount === 0) {
            return res.status(404).json({
                erro: 1,
                mensagem: 'Notificação não encontrada'
            });
        }

        // Sucesso
        res.json({ resposta: 'Notificação deletada com sucesso!' });

    } catch (error) {
        console.error('Erro ao deletar notificação:', error);

        res.status(500).json({
            erro: 2,
            mensagem: 'Não foi possível deletar a notificação',
            detalhe: error.message
        });
    }
});



//----------------- POSTES ---------------//

app.post('/criarposte', async (req, res) => {
    const { latitude, longitude, empresa_id, status } = req.body;

    try {
        const result = await db.one(
            `INSERT INTO postes (latitude, longitude, empresa_id, status) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [latitude, longitude, empresa_id, status]
        );

        res.status(201).json({
            mensagem: 'Poste criado com sucesso!',
            poste: result
        });
    } catch (error) {
        console.error('Erro ao criar poste:', error);
        res.status(500).json({ 
            erro: 1, 
            mensagem: 'Não foi possível criar o poste', 
            detalhe: error.message 
        });
    }
});

//------------------- Empresas Associadas ------------------//


app.post('/associar-empresa', async (req, res) => {
    const { poste_id, empresa_id } = req.body;

    try {
        // Verifica se já existe associação para não duplicar
        const existe = await db.oneOrNone(
            'SELECT * FROM empresas_associadas WHERE poste_id = $1 AND empresa_id = $2',
            [poste_id, empresa_id]
        );

        if (existe) {
            return res.status(400).json({ mensagem: 'Essa empresa já está associada a este poste.' });
        }

        // Associa a empresa ao poste
        await db.none(
            'INSERT INTO empresas_associadas (poste_id, empresa_id) VALUES ($1, $2)',
            [poste_id, empresa_id]
        );

        res.json({ mensagem: 'Empresa associada com sucesso!' });
    } catch (error) {
        console.error('Erro ao associar empresa:', error);
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível associar a empresa ao poste',
            detalhe: error.message
        });
    }
});

app.put('/alterar-status-poste', async (req, res) => {
    const { poste_id, empresa_id, novo_status } = req.body;

    try {
        // Verifica se a empresa é a dona ou está associada
        const autorizado = await db.oneOrNone(
            `SELECT 1
             FROM postes p
             LEFT JOIN empresas_associadas ea ON p.id = ea.poste_id
             WHERE p.id = $1 AND (p.empresa_id = $2 OR ea.empresa_id = $2)`,
            [poste_id, empresa_id]
        );

        if (!autorizado) {
            return res.status(403).json({
                erro: 1,
                mensagem: 'Você não tem permissão para alterar o status deste poste'
            });
        }

        // Atualiza o status
        await db.none(
            'UPDATE postes SET status = $1 WHERE id = $2',
            [novo_status, poste_id]
        );

        res.json({ mensagem: 'Status do poste atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao alterar status:', error);
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível atualizar o status',
            detalhe: error.message
        });
    }
});

app.get('/empresas-associadas/:poste_id', async (req, res) => {
    const { poste_id } = req.params;

    try {
        const empresas = await db.any(
            `SELECT e.id, e.nome, e.email, e.cnpj
             FROM empresas_associadas ea
             INNER JOIN empresa e ON ea.empresa_id = e.id
             WHERE ea.poste_id = $1`,
            [poste_id]
        );

        if (empresas.length === 0) {
            return res.json({ mensagem: 'Nenhuma empresa associada a este poste.' });
        }

        res.json(empresas);
    } catch (error) {
        console.error('Erro ao listar empresas associadas:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/postes-empresa/:empresa_id', async (req, res) => {
    const { empresa_id } = req.params;

    try {
        const postes = await db.any(
            `SELECT DISTINCT p.id, p.latitude, p.longitude, p.status, p.empresa_id,
                CASE WHEN p.empresa_id = $1 THEN 'dono' ELSE 'associado' END AS tipo_acesso
             FROM postes p
             LEFT JOIN empresas_associadas ea ON p.id = ea.poste_id
             WHERE p.empresa_id = $1 OR ea.empresa_id = $1`,
            [empresa_id]
        );

        if (postes.length === 0) {
            return res.json({ mensagem: 'Nenhum poste vinculado a esta empresa.' });
        }

        res.json(postes);
    } catch (error) {
        console.error('Erro ao listar postes:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});


// --------------- Consulta do Insomnia no BD------------------- //

app.get('/testefunc', async (req, res) => {
    const resposta = await db.any('SELECT * FROM funcionario');

    const saida = [];

    for (const item of resposta) {
        saida.push(
            {
                'id': item.id,
                'email': item.email,
                'senha' : item.senha,
                'code': item.code
            }
        )
    }
    res.json(
        saida
    );
});

app.get('/testenotificacao', async (req, res) => {
    const resposta = await db.any('SELECT * FROM notificacoes');

    const saida = [];

    for (const item of resposta) {
        saida.push(
            {
                'id': item.id,
                'texto': item.texto,
                'data' : item.data,
                'status': item.status
            }
        )
    }
    res.json(
        saida
    );
});

app.get('/testeempr', async (req, res) => {
    const resposta = await db.any('SELECT * FROM empresa');

    const saida = [];

    for (const item of resposta) {
        saida.push(
            {
                'id': item.id,
                'nome': item.nome,
                'email': item.email,
                'senha' : item.senha,
                'cnpj': item.cnpj,
                'code': item.code
            }
        )
    }
    res.json(
        saida
    );
});

app.get('/empresas-associadas/:poste_id', async (req, res) => {
    const { poste_id } = req.params;

    try {
        const empresas = await db.any(
            `SELECT e.id, e.nome, e.email, e.cnpj
             FROM empresa e
             INNER JOIN empresas_associadas ea ON e.id = ea.empresa_id
             WHERE ea.poste_id = $1`,
            [poste_id]
        );

        res.json(empresas);
    } catch (error) {
        console.error('Erro ao buscar empresas associadas:', error);
        res.status(500).json({
            erro: 1,
            mensagem: 'Não foi possível buscar empresas associadas',
            detalhe: error.message
        });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});