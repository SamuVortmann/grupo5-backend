import {randomUUID} from "node:crypto";
import {sql} from './db.js'

export class DatabasePostgres {

    async list(tabela, search = '') {
        

        items = await sql`SELECT * FROM ${tabela}`
        
        console.log(items);

        return items;
    }

    async update(tabela, itemID, item) {

        const { title, description } = item

        await sql`UPDATE ${tabela} SET title = ${title}, description =${description} WHERE id = ${itemID}`

    }

    async delete(tabela, itemId) {
        await sql`DELETE FROM ${tabela} WHERE id = ${itemId}`
    }

    async pegarMaiorIdDe(tabela) {
        console.log('tentando pegar');
        const maior = await sql`SELECT MAX(id) FROM ${tabela}`;
        console.log(maior);
        return maior ? maior : 1; 
    }

    // Empresa
    async createEmpresa(infos) {
        console.log(infos);
        const { id, nome, codigo, cnpj, telefone, email, senha } = infos;

        await sql`INSERT INTO empresa (id, nome, codigo, cnpj, telefone, email, senha) VALUES (${id}, ${nome}, ${codigo}, ${cnpj}, ${telefone}, ${email}, ${senha})`
    }

    async listEmpresa(coluna, search) {
        let result;
        if (!search) {
            result = await sql`SELECT * FROM empresa`
        } else {
            result = await sql`SELECT * FROM empresa WHERE ${coluna} = ${search}`
        }
        return result;
    }

    // Poste
    async createPoste(infos) {

        const { id, lat, lng, empresa_dona, regiao, status, conexcoes } = infos;

        await sql`INSERT INTO poste (id, coord_lat, coord_lng, empresa_dona, regiao, status, conexcoes) VALUES (${id}, ${lat}, ${lng}, ${empresa_dona}, ${regiao}, ${status}, ${conexcoes})`
    }

    async listPoste(coluna, search) {
        let result;
        if (!search) {
            result = await sql`SELECT * FROM postes`
        } else {
            result = await sql`SELECT * FROM postes WHERE ${coluna} = ${search}`
        }
        return result;
    }

    //Notificações
    async createNot(infos) {
        console.log(infos);
        const { id, posteassociado, descricao, status } = infos;

        await sql`INSERT INTO notificacao (id, posteassociado, descricao, status) VALUES (${id}, ${posteassociado}, ${descricao}, ${status})`
    }

    async listNot(coluna, search) {
        let result;
        if (!search) {
            result = await sql`SELECT * FROM notificacao`
        } else {
            result = await sql`SELECT * FROM notificacao WHERE ${coluna} = ${search}`
        }
        return result;
    }
}