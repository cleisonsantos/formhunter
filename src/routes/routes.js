const { Router } = require('express');
const router = Router();
const crawlerController = require('../controllers/crawlerController');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/api/crawler', crawlerController.index);

module.exports = router;