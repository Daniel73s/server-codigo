const pgconnection = require('../connection/connection');
const listarRoles=async(req,res)=>{
    const consulta ='select * from rol';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}
const listarRolById=async(req,res)=>{
    const codrol = req.params.codrol;
    const consulta ='select * from rol where codrol=$1';
    const response = await pgconnection.query(consulta,[codrol]);
    res.json(response.rows)
}
const listarRolByEstado=async(req,res)=>{
    const estado = req.params.estado;
    const consulta ='select * from rol where estado=$1';
    const response = await pgconnection.query(consulta,[estado]);
    res.json(response.rows)
}
const adicionarRol=async(req,res)=>{
    const {nombre,imagen}=req.body;
    const consulta ='insert into rol(nombre,imagen) values ($1,$2)';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),imagen]);
    res.json({
        'mensaje':'Se adiciono satisfactoriamente'
    })
}

const Cambiarestado=async(req,res)=>{
    const {codrol,estado}=req.body;
    const consulta ='update rol set estado=$1 where codrol=$2';
    const response = await pgconnection.query(consulta,[estado,codrol]);
    res.json({
        'mensaje':'Se a realizado la accion con exito'
    })
}

const actualizarRol=async(req,res)=>{
    const {nombre,imagen,codrol}=req.body;
    const consulta ='update rol set nombre=$1, imagen=$2 where codrol=$3';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),imagen,codrol]);
    res.json({
        'mensaje':'Se actualizo satisfactoriamente'
    })
}

//listar los procesos que pertenecen a un rol
const listarProcesosDeRol=async(req,res)=>{
    const codrol = req.params.codrol;
    const consulta ='select p.codproc, p.nombre, p.icono from rol r,procesos p,rolpro rp where r.codrol=$1 and r.codrol=rp.codrol and p.codproc=rp.codproc';
    const response = await pgconnection.query(consulta,[codrol]);
    res.json(response.rows)
}
//Adicionar RolPro
const addrolpro=async(req,res)=>{
    const {codrol,codproc}=req.body;
    const consulta ='insert into rolpro(codrol,codproc) values ($1,$2)';
    const response = await pgconnection.query(consulta,[codrol,codproc]);
    res.json({
        'mensaje':'Se guardo satisfactoriamente'
    })
}
//Remover RolPro
const removerolpro=async(req,res)=>{
    const {codrol,codproc}=req.body;
    const consulta ='DELETE FROM rolpro where codrol=$1 and codproc=$2';
    const response = await pgconnection.query(consulta,[codrol,codproc]);
    res.json({
        'mensaje':'Se elimino Satisfactoriamente'
    })
}



module.exports ={
   listarRoles,
   adicionarRol,
   Cambiarestado,
   listarRolById,
   actualizarRol,
   listarRolByEstado,
   listarProcesosDeRol,
   addrolpro,
   removerolpro
}    