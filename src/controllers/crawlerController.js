const crawlerService = require('../services/crawlerService')

const index = async (req, res) => {
    crawlerService.accessWebsite('https://www.shieldsec.com.br/')
    res.send('Buscado!');
}

module.exports = {
    index
}