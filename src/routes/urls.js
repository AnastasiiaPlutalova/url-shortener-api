import express from 'express';
import {
    getUrl, // gets url by id
    createUrl, // add url to db {originalUrl, hash, stat: [{date, clicks}]}
    updateUrl, // update stat
    deleteUrl,
} from '../controllers/urls.js';

const router = express.Router();

router.get('/', getUrl);

router.post('/', createUrl); // check if url exists and use update url 

router.put('/', updateUrl);

router.delete('/', deleteUrl);

export default router;
