import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { urls: [] };

export const getUrl = (async (req, res) => {
    await db.read();
    const url = db.data.urls.find((item) => item.hash === req.params.urlHash);
    if (!url) {
      res.sendStatus(404);
    } else {
      res.send(url);
    }
});

export const createUrl = (async (req, res) => {
    try {
        await db.read();
        db.data.urls.push({...req.body, statistic: []});
        await db.write();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

export const updateUrl = ((req, res) => {
    console.log('updateUrl');
});

export const deleteUrl = ((req, res) => {
    console.log('deleteUrl');
});
