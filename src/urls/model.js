import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import isUrl from '../utils';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.data ||= { urls: [] };

export const getByShortUrl = async (shortUrl) => {
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