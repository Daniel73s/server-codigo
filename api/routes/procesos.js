const express = require('express');
const router = express.Router();
const { listarprocesos, adicionarproceso, cambiarestadoproceso, procesoById, actualizarproceso, getprocesosyrol } = require('../controllers/procesos.controller');
router.get('/listarprocesos',listarprocesos);
router.get('/procesoById/:codproc',procesoById);
router.post('/addproceso',adicionarproceso);
router.put('/estadoproceso',cambiarestadoproceso);
router.put('/updateproceso',actualizarproceso);
//Prueva
router.get('/procesosrol',getprocesosyrol);
module.exports = router;