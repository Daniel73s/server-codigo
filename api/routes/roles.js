const express = require('express');
const router = express.Router();
const { listarRoles, adicionarRol, Cambiarestado, listarRolById, actualizarRol, listarRolByEstado, listarProcesosDeRol, addrolpro, removerolpro } = require('../controllers/roles.controller');
router.get('/listarRoles',listarRoles);
router.get('/listarrolbyid/:codrol',listarRolById);
router.get('/listarRolesestado/:estado',listarRolByEstado);
router.get('/rolpro/:codrol',listarProcesosDeRol);
router.post('/addrol',adicionarRol);
router.post('/removerolpro',removerolpro);
router.post('/addrolpro',addrolpro);
router.put('/estadorol',Cambiarestado);
router.put('/updaterol',actualizarRol);

module.exports = router;