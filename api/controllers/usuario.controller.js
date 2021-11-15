const pgconnection = require('../connection/connection');
const Bcryptjs = require('bcryptjs');


//Obteniendo tipos de usuarios
const CountPersonaRol = async (req, res) => {
    const codrol = req.params.codrol;
    const consulta = ' select count(*) from usuario where codrol=$1';
    const response = await pgconnection.query(consulta, [codrol]);
    res.json(response.rows)
}
//Obteniendo numero de todos los usuarios
const CountUsuarios = async (req, res) => {
    const consulta = ' select count(*) from usuario';
    const response = await pgconnection.query(consulta);
    res.json(response.rows)
}
//Obteniendo Usuarios
const getPersona = async (req, res) => {
    const consulta = 'select p.codper,p.nombre,p.ap,p.am,p.fechanac,p.celular,p.direccion,p.foto,u.login,u.estado,u.codrol from persona p,usuario u where (p.codper=u.codper)';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}
//Obteniendo personas que son de un rol especifico
const getPersonaRol = async (req, res) => {
    const codrol = req.params.codrol;
    const consulta = 'select p.codper,p.nombre,p.ap,p.am,p.foto,u.login,u.codrol from persona p,usuario u where (p.codper=u.codper) and (u.codrol=$1)';
    const response = await pgconnection.query(consulta, [codrol]);
    res.send(response.rows)
}
//Obteniendo persona por Codper
const getPersonaById = async (req, res) => {
    const id = req.params.id;
    const response = await pgconnection.query('select * from persona where codper=$1', [id]);
    res.send(response.rows)
}
//Adicionar Përsona
const postPersona = async (req, res) => {
    const { nombre, ap, am, fechanac, celular, direccion, foto, fechacre } = req.body;
    const response = await pgconnection.query('insert into persona(nombre,ap,am,fechanac,celular,direccion,foto) values ($1,$2,$3,$4,$5,$6,$7) RETURNING codper', [
        nombre.toUpperCase(),
        ap.toUpperCase(),
        am.toUpperCase(),
        fechanac,
        celular,
        direccion.toUpperCase(),
        foto
    ]);
    res.send(response.rows)

}

/*Modificar persona*/
const modPersona = async (req, res) => {
    const codper = req.params.codper;
    const { nombre, ap, am, fechanac, celular, direccion, foto } = req.body;
    const response = await pgconnection.query('update persona set nombre=$1, ap=$2, am=$3, fechanac=$4, celular=$5, direccion=$6, foto=$7 where codper=$8', [
        nombre.toUpperCase(),
        ap.toUpperCase(),
        am.toUpperCase(),
        fechanac,
        celular,
        direccion.toUpperCase(),
        foto,
        codper
    ]);
    res.json({ mensaje: 'Se actualizo satisfactoriamente' });
}
//Creando cuenta de usuario de persona
const crearCuenta = async (req, res) => {
    const { user, clave, codper, codrol, fechacre } = req.body;
    const claveHash = await Bcryptjs.hash(clave, 8);
    const response = await pgconnection.query('insert into usuario(login,clave,codper,codrol,fechacre) values ($1,$2,$3,$4,$5)', [
        user,
        claveHash,
        codper,
        codrol,
        fechacre
    ]);
    res.json({
        "mensaje": "se adiciono satisfactoriamente"
    });
}

//listar roles
const listarRoles = async (req, res) => {
    const consulta = 'select * from rol';
    const response = await pgconnection.query(consulta);
    res.json(response.rows)
}
//Modificar Clave de Usuario
const mostrarClave = async (req, res) => {
    const login = req.params.login;
    const response = await pgconnection.query('select clave from usuario where login=$1', [
        login
    ]);
    res.send(response.rows);
}

//Traer una cuenta en especifico
const getCuenta = async (req, res) => {
    const codper = req.params.codper;
    const response = await pgconnection.query('select * from usuario where codper=$1', [
        codper
    ]);
    res.send(response.rows);
}
//Cambiar clave de la cuenta
const cambiarClave = async (req, res) => {
    const { username, clave } = req.body;
    const claveHash = await Bcryptjs.hash(clave, 8);
    const response = await pgconnection.query('update usuario set clave=$1 where login=$2', [
        claveHash,
        username
    ]);
    res.json({
        "mensaje": "se actualizo satisfactoriamente la clave"
    });
}

//Cambiar el rol de usuario
const cambiarRol = async (req, res) => {
    const { username, rol } = req.body;
    const response = await pgconnection.query('update usuario set codrol=$1 where login=$2', [
        rol,
        username
    ]);
    res.json({
        "mensaje": "se actualizo satisfactoriamente"
    });
}

//Mostrar datos para imprimir

const ImprimirDatosPersona = async (req, res) => {
    const codper = req.params.codper;
    // console.log(codper);
    const consulta = 'select p.codper,p.nombre,p.ap,p.am,p.fechanac,p.celular,p.direccion,p.foto,u.login,u.fechacre,r.nombre as rol,r.codrol from persona p,usuario u, rol r where (p.codper=u.codper)and (p.codper=$1)and (u.codrol=r.codrol)';
    const response = await pgconnection.query(consulta, [codper]);
    res.json(response.rows)
}

//Listar Procesos de un usuario

const rolpro = async (req, res) => {
    const codrol = req.params.codrol;
    const consulta = 'select p.nombre,p.enlace,p.icono from procesos p, rol r, rolpro rp where r.codrol=$1 and p.codproc=rp.codproc and r.codrol=rp.codrol and p.estado=true';
    const response = await pgconnection.query(consulta, [codrol]);
    res.json(response.rows)
}

//listar personas que pertenescan a una veterinaria
const personaVeterinaria = async (req, res) => {
    const codvet = req.params.codvet;
    const consulta = 'select p.codper,p.nombre,p.ap,p.am,p.foto from persona p, pervet pv,veterinarias v where v.codvet=$1 and p.codper=pv.codper and v.codvet=pv.codvet';
    const response = await pgconnection.query(consulta, [codvet]);
    res.json(response.rows)
}

//Reportes de usuarios
const ReporteUsuarios = async (req, res) => {
    const { rol, estado, mes } = req.body;
    if (estado == 0 && mes == 13) {
        const consulta = 'select p.codper,p.nombre,p.ap as Apellido_Paterno,p.am as Apellido_Materno,u.fechacre as FechaCreacion,r.nombre as Rol from persona p, usuario u,rol r where (p.codper=u.codper) and (u.codrol=r.codrol) and (r.codrol=$1)';
        const response = await pgconnection.query(consulta, [
            rol
        ]);
        res.json(response.rows)
    } else {
        if (estado == 0) {
            const consulta = 'select p.codper,p.nombre,p.ap as Apellido_Paterno,p.am as Apellido_Materno,u.fechacre as FechaCreacion,r.nombre as Rol from persona p, usuario u,rol r where (p.codper=u.codper) and (extract(month from fechacre)=$1) and (u.codrol=r.codrol) and (r.codrol=$2)';
            const response = await pgconnection.query(consulta, [
                mes,
                rol
            ]);
            res.json(response.rows)
        } else {
            if (mes == 13) {
                const consulta = 'select p.codper,p.nombre,p.ap as Apellido_Paterno,p.am as Apellido_Materno,u.fechacre as Fecha_de_Registro,r.nombre as Rol from persona p, usuario u,rol r where (p.codper=u.codper) and (u.estado=$1) and  (u.codrol=r.codrol) and (r.codrol=$2)';
                const response = await pgconnection.query(consulta, [
                    estado,
                    rol
                ]);
                res.json(response.rows)
            } else {
                const consulta = 'select p.codper,p.nombre,p.ap as Apellido_Paterno,p.am as Apellido_Materno,u.fechacre as Fecha_de_Registro,r.nombre as Rol from persona p, usuario u,rol r where (p.codper=u.codper) and (u.estado=$1) and (extract(month from fechacre)=$2) and (u.codrol=r.codrol) and (r.codrol=$3)';
                const response = await pgconnection.query(consulta, [
                    estado,
                    mes,
                    rol
                ]);
                res.json(response.rows)
            }
        }
    }
}
//Habilitar y deshabilitar Usuario
const EstadoUsuario = async (req, res) => {
    const { login,estado } = req.body;
    const consulta="update usuario set estado=$1 where login=$2";
    const response = await pgconnection.query(consulta, [
        estado,
        login
    ]);
    if(estado){
        res.json({mensaje:"Se Habilito Usuario"});
    }else{
        res.json({mensaje:"Se Desactivo Usuario"});
    }
}



module.exports = {
    getPersona,
    getPersonaById,
    postPersona,
    modPersona,
    crearCuenta,
    cambiarClave,
    mostrarClave,
    ImprimirDatosPersona,
    listarRoles,
    getCuenta,
    cambiarRol,
    getPersonaRol,
    CountPersonaRol,
    CountUsuarios,
    rolpro,
    personaVeterinaria,
    ReporteUsuarios,
    EstadoUsuario
}