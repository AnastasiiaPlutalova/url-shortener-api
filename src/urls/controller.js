import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { getUrlByShortUrl, saveUrl, updateStatisticByShortUrl } from "./model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { urls: [] };

export const getUrl = (async (req, res) => {
    const { shortUrl } = req.query;
    try {
        const url = await getUrlByShortUrl(shortUrl);
        res.status(200).send(url);
    } catch ({ message }) {
        res.status(500).send({ message });
    }
});

export const createUrl = (async (req, res) => {
    try {
        const result = await saveUrl(req.body);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ message });
    }
});

export const updateUrl = (async (req, res) => {
    try {
        const result = await updateStatisticByShortUrl(req.body);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ message });
    }
});

export const deleteUrl = (async (req, res) => {
    const { shortUrl } = req.query;
    try {
        await db.read();
        const urls = db.data.urls.filter((item) => item.shortUrl !== shortUrl);
        db.data.urls = urls;
        await db.write();
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});
