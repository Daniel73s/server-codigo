const express = require('express');
const { verifyToken } = require('../controllers/autenticacion.controller');
const router = express.Router();
const {listarvet, addveterinaria, delveterinaria, habveterinaria, asignarpervet, listarvetByCodvet, duenosveterinaria, Countvetrerinarias, updateveterinaria, eliminarpervet, listarvetusu, AbrirCerrarVet, listarvetByAc, modvetapp, listarvetByEstado, ReporteVeterinarias} = require('../controllers/veterinarias.controller');
router.get('/listarvet',listarvet);
router.get('/vetByid/:codvet',listarvetByCodvet);
router.get('/duenosvet/:codvet',duenosveterinaria);
router.get('/countvet/:estado',Countvetrerinarias);
router.get('/listarvetusu/:codper',listarvetusu);
router.post('/adicionarvet',addveterinaria);
router.post('/addpervet',asignarpervet);
router.put('/updatevet/:codvet',updateveterinaria);
router.delete('/delvet/:codvet',delveterinaria);
router.delete('/habvet/:codvet',habveterinaria);
router.post('/delpervet',eliminarpervet);
router.put('/abrirCerrarVet',AbrirCerrarVet);
router.get('/listarvetbyac/:ac',listarvetByAc);
//modulo modificar veterinaria desde la app
router.put('/modvetapp',modvetapp);
//modulo listar veterinaria con el estado true
router.get('/listarvetbyestado/:estado',listarvetByEstado);
router.post('/reporteveterinarias',ReporteVeterinarias);
module.exports = router;