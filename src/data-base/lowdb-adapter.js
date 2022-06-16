import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const schema = { urls: [] };

db.data ||= schema;

export const getItem = async (tableName, propertyName, propertyValue) => {
    await db.read();
    const item = db.data[tableName].find((item) => item[propertyName] === propertyValue);
    return item;
}

export const saveItem = async (tableName, item) => {
    await db.read();
    db.data[tableName].push(item);
    await db.write();
}

export const updateItem = async (tableName, item, propertyName, propertyValue) => {
    await db.read();
    const itemIndex = db.data[tableName].findIndex((item) => item[propertyName] === propertyValue);
    if (itemIndex !== -1) {
        db.data[tableName][itemIndex] = item;
        await db.write();
    } else {
        throw new Error('Item not found');
    }
}

export const deleteItem = async (tableName, propertyName, propertyValue) => {
    await db.read();
    const items = db.data[tableName].filter((item) => item[propertyName] !== propertyValue);
    db.data[tableName] = items;
    await db.write();
}
