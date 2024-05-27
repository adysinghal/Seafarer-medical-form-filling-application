const express = require('express')
const router = express.Router()

router.get('/adi', (req, res) => {
    obj = {
        a: 'asudh',
        num: 34
    }
    res.json(obj);
})

module.exports = router