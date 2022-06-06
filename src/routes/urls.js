const express = require('express')
const router = express.Router()

const  { 
    getUrl, // gets url by id
    createUrl, // add url to db {originalUrl, shortenUrl, stat: [{date, clicks}]}
    updateUrl, // update stat
    deleteUrl,
    shortenUrl, // returns hash
} = require('../controllers/urls.js')


router.post('/shorten-url', shortenUrl);

router.get('/:urlHash', getUrl);

router.post('/', createUrl);

router.put('/:urlHash', updateUrl);

router.delete('/:urlHash', deleteUrl);

module.exports = router;
