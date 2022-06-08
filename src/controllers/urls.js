import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { urls: [] };

export const getUrl = (async (req, res) => {
    const {shortUrl} = req.query;
    if(shortUrl) {
        try {
            await db.read();
            const url = db.data.urls.find((item) => item.shortUrl === shortUrl);
            url ? res.send(url) : res.status(500).send({message: `${shortUrl} not found`});
        } catch {
            res.status(500).send({message: 'Something went wrong'});
        }
    } else {
        res.status(500).send({message: 'Wrong parameters'});
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
