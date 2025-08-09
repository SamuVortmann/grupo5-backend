import {randomUUID} from "node:crypto";
import {sql} from './db.js'

export class DatabasePostgres {
    #items = new Map();
    #ids = 0;

    async list(search = '') {
        let items;
        console.log(search);


        items = await sql`SELECT * FROM items`
        
        console.log(items);

        return items;
    }

    async create(item) {
        // const { nome,codigo, cnpj, telefone, email } = item;

        // await sql`INSERT INTO empresa (id, nome, codigo, cnpj, telefone, email) VALUES (${videoID}, ${nome}, ${codigo}, ${cnpj}, ${telefone}, ${email})`

        const { title, description } = item;

        await sql`INSERT INTO items (id, title, description) VALUES (${++this.#ids}, ${title}, ${description})`

    }

    async update(itemID, item) {

        const { title, description } = item

        await sql`UPDATE items SET title = ${title}, description =${description} WHERE id = ${itemID}`

    }

    async delete(itemId) {

        await sql`DELETE FROM items WHERE id = ${itemId}`

    }
}