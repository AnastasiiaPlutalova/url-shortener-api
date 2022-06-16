import isUrl from '../utils/is-url.js';
import * as db from '../data-base/lowdb-adapter.js';

const TABLE_NAME = 'urls';
const PROPERTY_NAMES = {
    SHORT_URL: 'shortUrl',
};

export const getUrlByShortUrl = async (shortUrl) => {
    if (isUrl(shortUrl)) {
        try {
            const url = await db.getItem(TABLE_NAME, PROPERTY_NAMES.SHORT_URL, shortUrl);
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
            const url = { originalUrl, shortUrl, statistic };
            await db.saveItem(TABLE_NAME, url);
            return url;
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
            const url = await db.getItem(TABLE_NAME, PROPERTY_NAMES.SHORT_URL, shortUrl);
            if (url) {
                url.statistic = statistic;
                await db.updateItem(TABLE_NAME, url, PROPERTY_NAMES.SHORT_URL, shortUrl);
                return url;
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
            await db.deleteItem(TABLE_NAME, PROPERTY_NAMES.SHORT_URL, shortUrl);
        } catch (e) {
            throw e;
        }
    } else {
        throw new Error("Passed short URL is not valid url");
    }
}