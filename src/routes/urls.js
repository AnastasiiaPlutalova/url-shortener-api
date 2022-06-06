import express from 'express';
import {
    getUrl, // gets url by id
    createUrl, // add url to db {originalUrl, hash, stat: [{date, clicks}]}
    updateUrl, // update stat
    deleteUrl,
} from '../controllers/urls.js';

const router = express.Router();

router.get('/:urlHash', getUrl);

router.post('/', createUrl);

router.put('/:urlHash', updateUrl);

router.delete('/:urlHash', deleteUrl);

export default router;
