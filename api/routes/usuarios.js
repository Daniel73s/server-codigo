const express = require('express');
const { verifyToken } = require('../controllers/autenticacion.controller');
const router = express.Router();
const {getPersona, postPersona, getPersonaById, crearCuenta, cambiarClave, mostrarClave, getCuenta, cambiarRol, modPersona, ImprimirDatosPersona, getPersonaRol, CountPersonaRol, CountUsuarios, rolpro, personaVeterinaria, ReporteUsuarios, EstadoUsuario} = require('../controllers/usuario.controller');
router.get('/listarPersonas',getPersona);
router.get('/listarPersonaById/:id',getPersonaById);
router.get('/listarpersonasRol/:codrol',getPersonaRol);
router.get('/countpersona/:codrol',CountPersonaRol);
router.get('/countusuarios',CountUsuarios);
router.post('/crearPersona',postPersona);
router.put('/modPersona/:codper',modPersona);
router.post('/crearCuenta',crearCuenta);
router.get('/getCuenta/:codper',getCuenta);
router.put('/cambiarclave',cambiarClave);
router.post('/mostrarClave',mostrarClave);
router.put('/modRol',cambiarRol);
router.get('/imprimirPersona/:codper',ImprimirDatosPersona);
router.get('/rolprocesos/:codrol',rolpro);
router.get('/pervet/:codvet',personaVeterinaria);
router.post('/reporteusuarios',ReporteUsuarios);
router.put('/estadousuario',EstadoUsuario);
// router.post('/pruevaClave',pruevaClave);




module.exports = router;