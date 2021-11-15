const express = require('express');
const router = express.Router();
const {login, info,verifyToken} = require('../controllers/autenticacion.controller');
router.post('/login',login);
router.post('/info',verifyToken,info)




module.exports = router;