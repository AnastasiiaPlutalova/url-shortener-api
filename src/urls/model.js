import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import isUrl from '../utils/is-url.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { urls: [] };

export const getUrlByShortUrl = async (shortUrl) => {
    if (isUrl(shortUrl)) {
        try {
            await db.read();
            const url = db.data.urls.find((item) => item.shortUrl === shortUrl);
            if (url) {
                return url;
            } else {
                throw new Error (`URL by ${shortUrl} not found`);
            }
        } catch (e) {
            throw e;
        }

    } else {
        throw new Error("Passed short URL is not valid url");
    }
}

export const saveUrl = async ({ originalUrl, shortUrl, statistic = [] }) => {
    if (isUrl(originalUrl) && isUrl(shortUrl)) {
        try {
            const urlToSave = { originalUrl, shortUrl, statistic };
            await db.read();
            db.data.urls.push(urlToSave);
            await db.write();

            return urlToSave;
        } catch (e) {
            throw e;
        }
    } else {
        throw new Error("Passed URLs are not valid");
    }
}

export const updateStatisticByShortUrl = async ({ shortUrl, statistic }) => {
    if (isUrl(shortUrl) && statistic?.length > 0) {
        try {
            await db.read();
            const urlIndex = db.data.urls.findIndex((item) => item.shortUrl === shortUrl);
            if (urlIndex !== -1) {
                db.data.urls[urlIndex].statistic = statistic;
                await db.write();
                return db.data.urls[urlIndex];
            } else {
                throw new Error('Url not found');
            }
        } catch (e) {
            throw e;
        }
    } else {
        throw new Error('Incorrect passed data');
    }
    
}

export const deleteUrlByShortUrl = async (shortUrl) => {
    if (isUrl(shortUrl)) {
        try {
            await db.read();
            const urls = db.data.urls.filter((item) => item.shortUrl !== shortUrl);
            db.data.urls = urls;
            await db.write();
        } catch (e) {
            throw e;
        }
    } else {
        throw new Error("Passed short URL is not valid url");
    }
}