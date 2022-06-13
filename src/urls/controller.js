import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

export const getUrl = (async (req, res) => {
    const { shortUrl } = req.query;
    if (shortUrl) {
        try {
            await db.read();
            const url = db.data.urls.find((item) => item.shortUrl === shortUrl);
            url ? res.send(url) : res.status(500).send({ message: `${shortUrl} not found` });
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Something went wrong' });
        }
    } else {
        res.status(500).send({ message: 'Wrong parameters' });
    }
});

export const createUrl = (async (req, res) => {
    try {
        await db.read();
        db.data.urls.push({ ...req.body, statistic: [] });
        await db.write();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

export const updateUrl = (async (req, res) => {
    const { shortUrl, statistic } = req.body;
    try {
        await db.read();
        const urlIndex = db.data.urls.findIndex((item) => item.shortUrl === shortUrl);
        console.log(urlIndex);
        if (urlIndex !== -1) {
            db.data.urls[urlIndex].statistic = statistic;
            await db.write();
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
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
