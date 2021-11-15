const pgconnection = require('../connection/connection');
const listarprocesos=async(req,res)=>{
    const consulta ='select * from procesos';
    const response = await pgconnection.query(consulta);
    res.json(response.rows)
}
const procesoById=async(req,res)=>{
    const codproc = req.params.codproc;
    const consulta ='select * from procesos where codproc=$1';
    const response = await pgconnection.query(consulta,[codproc]);
    res.json(response.rows[0])
}
const adicionarproceso=async(req,res)=>{
    const {nombre,enlace,icono}=req.body;
    const consulta ='insert into procesos(nombre,enlace,icono) values ($1,$2,$3)';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),enlace,icono]);
    res.json({
        'mensaje':'Se adiciono satisfactoriamente'
    })
}

const cambiarestadoproceso=async(req,res)=>{
    const {codproc,estado}=req.body;
    const consulta ='update procesos set estado=$1 where codproc=$2';
    const response = await pgconnection.query(consulta,[estado,codproc]);
    res.json({
        'mensaje':'Se cambio el estado'
    })
}
//Acualizar Proceso
const actualizarproceso=async(req,res)=>{
    const {codproc,nombre,icono,enlace}=req.body;
    const consulta ='update procesos set nombre=$1,icono=$2,enlace=$3 where codproc=$4';
    const response = await pgconnection.query(consulta,[nombre.toUpperCase(),icono,enlace,codproc]);
    res.json({
        'mensaje':'Se actualizo satisfactoriamente'
    })
}

//Sacar los procesos y saber a que rol pertenecen
const getprocesosyrol=async(req,res)=>{
    const consulta ='select p.codproc,p.nombre,r.codrol from procesos p, rolpro rp,rol r where p.codproc=rp.codproc and r.codrol=rp.codrol';
    const response = await pgconnection.query(consulta);
    res.json(response.rows)
}


module.exports ={
   listarprocesos,
   adicionarproceso,
   cambiarestadoproceso,
   procesoById,
   actualizarproceso,
   getprocesosyrol
}    