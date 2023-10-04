var express = require('express')
var router = express.Router()

const apiLetter = require('../controllers/apiTest')

// API Letter
router.get('/prime', apiLetter.indexPrime)
router.get('/odd', apiLetter.indexOdd)
router.get('/triangle', apiLetter.triangle)

module.exports = router
