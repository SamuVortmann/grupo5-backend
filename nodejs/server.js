// GET -> Buscar informação
// POST -> Criação
// PUT -> Alteração
// DELETE 
//PATCH -> Alterar apenas 1 informação específica

import { DatabaseMemory } from './database-memory.js';
import {fastify} from "fastify";

const server = fastify();// cria os server

const db = new DatabaseMemory();


// Rota , Executa tal
server.post('/index', (request, reply) => {

    const { title, description } = request.body;

    // console.log(body);

    db.create({
        title,
        description,
    });

    console.log(db.list());

    return reply.status(201).send();
})

// Navegadores apenas acessam essa!
server.get('/index', (request, reply) => {
    const videos = db.list();
    return videos;
})

// : <- variavel
server.put('/index/:id', (request, reply) => {
    const id = request.params.id;
    // Pega do corpo da request (AInda não sei fazer isso em SITE)
    const { title, description } = request.body;
    // Faz update no BD
    db.update(id, {
        title,
        description,
    })
    
    return reply.status(204).send();
})

server.delete('/index/:id', (request, reply) => {
    const id = request.params.id;
    
    // Faz delete no BD
    db.delete(id)

    return reply.status(204).send();
})

server.listen({
    port: 5000,
}) 