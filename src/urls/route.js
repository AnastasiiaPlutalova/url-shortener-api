import express from 'express';
import {
    getUrl,
    createUrl,
    updateUrl,
    deleteUrl,
} from './controller.js';

const router = express.Router();

router.get('/', getUrl);

router.post('/', createUrl);

router.put('/', updateUrl);

router.delete('/', deleteUrl);

export default router;
