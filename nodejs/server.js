import { fastify } from "fastify";
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import path from 'path';
import ejs from 'ejs';
import { DatabasePostgres } from './database-postgres.js'; // ajustado para seu arquivo db.js

const server = fastify();
const sql = new DatabasePostgres();

// Serve arquivos estáticos (CSS, JS, imagens, etc.)
server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'static'), // serve arquivos da pasta static/
    prefix: '/static/', // acessa via /static/arquivo.ext
});

// Registra o plugin de visualização com EJS
server.register(fastifyView, {
    engine: {
        ejs: ejs,
    },
    root: path.join(process.cwd(), 'views'), // onde estão os arquivos .ejs
});

// Rota principal
server.get('/', async (request, reply) => {
    return reply.view('index.ejs', { nome: "Nome do Bruno!" });
});

// Rota de cadastro de empresas
server.get('/registro/empresas', async (request, reply) => {
    return reply.view('cadastroEmpresa.ejs'); // ainda está como .html, pode converter para .ejs
});

// Rota de cadastro de funcionários
server.get('/registro/funcionario/:idEmpresa', async (request, reply) => {
    const idEmpresa = request.params.idEmpresa;
    return reply.view('cadastroFuncionario.ejs', { idEmpresa }); // pode virar .ejs
});

server.get('/logar', async (request, reply) => {
    return reply.view('login.ejs');
});

server.get('/mapa', async (request, reply) => {
    const version = Math.random()*100; // utilizado para o mapa carregar assim que recarregar a pagina??? bug esquisito
    return reply.view('mapa.ejs', {api_key: process.env.API_KEY, versao: version});
})

server.get('/notificacoes', async (request, reply) => {
    return reply.view('notificacoes.ejs');
});

server.get('/historico/:number', async (request, reply) => {
    const number = request.params.number;
    return reply.view('historico.ejs', {num: number});
});










// Rota POST para criar dados
server.post('/index', async (request, reply) => {
    const { title, description } = request.body;
    await sql.create({ title, description });
    return reply.status(201).send();
});

// Rota PUT para atualizar dados
server.put('/index/:id', async (request, reply) => {
    const id = request.params.id;
    const { title, description } = request.body;
    await sql.update(id, { title, description });
    return reply.status(204).send();
});

// Rota DELETE para remover dados
server.delete('/index/:id', async (request, reply) => {
    const id = request.params.id;
    await sql.delete(id);
    return reply.status(204).send();
});

// Inicia o servidor
server.listen({ port: 5000 }, (err, address) => {
    if (err) throw err;
    console.log(`Servidor rodando em ${address}`);
});
