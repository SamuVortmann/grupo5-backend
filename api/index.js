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



app.post('/login', async (req, res) => {
    const dados = req.body;
    const [resposta] = await db.any('SELECT * FROM usuarios WHERE usuario = $1 and senha = $2', 
        [dados.usuario, dados.senha]);

    if (!resposta) {
        res.json(
            {
                'erro': 1,
                'mensagem': 'Usuário ou senha incorretos'
            }
        )    
    } else {
        res.json(
           {'resposta': 'ok'}
        )
    }
    
})

app.get('/usuarios', async (req, res) => {
    const resposta = await db.any('SELECT * FROM usuarios');

    const saida = [];

    for (const item of resposta) {
        saida.push(
            {
                'id': item.id,
                'usuario': item.usuario
            }
        )
    }
    res.json(
        saida
    );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})