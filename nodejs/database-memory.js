import {randomUUID} from "node:crypto";

export class DatabaseMemory {
    #items = new Map();

    list(search) {
        return Array.from(this.#items.entries().map((itemArray) => {
            const id = itemArray[0];
            const body = itemArray[1];

            return {
                id,
                ...body,
            }
        })).filter(item => {
            if (search) {
                return item.title.includes(search)
            }

            return true;
        })

    }

    create(item) {
        const itemID = randomUUID();
        
        this.#items.set(itemID, item);
    }

    update(itemID, item) {
        this.#items.set(itemID, item);
    }

    delete(itemId, item) {
        this.#items.delete(itemId, item);
    }
}