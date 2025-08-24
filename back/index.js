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




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});