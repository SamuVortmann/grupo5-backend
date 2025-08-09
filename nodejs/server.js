// GET -> Buscar informação
// POST -> Criação
// PUT -> Alteração
// DELETE 
//PATCH -> Alterar apenas 1 informação específica

// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';
import {fastify} from "fastify";

const server = fastify();// cria os server

// const db = new DatabaseMemory();
const sql = new DatabasePostgres();


// Rota , Executa tal
server.post('/index', async (request, reply) => {

    const { title, description } = request.body;

    // console.log(body);

    await sql.create({
        title,
        description,
    });

    console.log(sql.list());

    return reply.status(201).send();
})

// Navegadores apenas acessam essa!
 server.get('/index', async (request, reply) => {
                          //Opticional -> pega variavel
    const search = request.query;
    console.log(search);

    const videos = await sql.list(search);
    return videos;
})

// : <- variavel
server.put('/index/:id', async (request, reply) => {
    const id = request.params.id;
    // Pega do corpo da request (AInda não sei fazer isso em SITE)
    const { title, description } = request.body;
    // Faz update no BD
    await sql.update(id, {
        title,
        description,
    })
    
    return reply.status(204).send();
})

server.delete('/index/:id', async(request, reply) => {
    const id = request.params.id;
    
    // Faz delete no BD
    await sql.delete(id)

    return reply.status(204).send();
})

server.listen({
    port: 5000,
}) 