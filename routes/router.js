require('dotenv').config()
const express = require('express');
const router = express.Router();
const usersRoutes = require('./userRoutes.js');
const authRoutes = require('./authRoutes.js')

router.use('/', usersRoutes, authRoutes)
router.get('/', (req, res) => {
    console.log('Rendering Welcome Message')
    res.send('Welcome to the Stockr API')
 });


module.exports = router;