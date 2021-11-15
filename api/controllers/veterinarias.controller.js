const pgconnection = require('../connection/connection');

//Obteniendo veterinarias
const listarvet=async(req,res)=>{
    const consulta ='select * from veterinarias';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}

//Obteniendo numero de veterinarias segun su estado
const Countvetrerinarias=async(req,res)=>{
    const estado = req.params.estado;
    const consulta =' select count(*) from veterinarias where estado=$1 ';
    const response = await pgconnection.query(consulta,[estado]);
    res.json(response.rows)
}

//Obteniendo veterinaria por codvet

const listarvetByCodvet=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select * from veterinarias where codvet=$1';
    const response = await pgconnection.query(consulta,[codvet]);
    res.json(response.rows)
}

//Obteniendo los dueños de la veterinaria

const duenosveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select p.nombre, p.ap, p.am, p.foto from persona p, veterinarias vet, pervet pv  where (vet.codvet=$1) and (p.codper=pv.codper) and (vet.codvet=pv.codvet)';
    const response = await pgconnection.query(consulta,[codvet]);
    res.json(response.rows)
}
//Adicionar veterinaria
const addveterinaria=async(req,res)=>{
    const {nombre,telefono,lng,lat,foto,direccion,descripcion,fechacre} = req.body;
    const response=await pgconnection.query('insert into veterinarias(nombre,telefono,lng,lat,imagen,direccion,descripcion,fechacre,fechamod) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[
        nombre.toUpperCase(),
        telefono,
        lng,
        lat,
        foto,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechacre,
        fechacre
    ]);
    res.json({mensaje:'Se adiciono satisfactoriamente'})
}

//Actualizar veterinaria
const updateveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const {nombre,telefono,lng,lat,imagen,direccion,descripcion,fechamod} = req.body;
    const consulta='update veterinarias set nombre=$1, telefono=$2, lng=$3, lat=$4, imagen=$5, direccion=$6, descripcion=$7,fechamod=$8 where codvet=$9'
    const response=await pgconnection.query(consulta,[
        nombre.toUpperCase(),
        telefono,
        lng,
        lat,
        imagen,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechamod,
        codvet
    ]);
    res.json({mensaje:'Se actualizo satisfactoriamente'})
}


//Eliminar Veterinaria
const delveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    const response=await pgconnection.query('update veterinarias set estado=false, ac=false where codvet=$1',[
        codvet
    ]);
    res.json({mensaje:'Se dio de baja satisfactoriamente'})
}

//Habilitar Veterinaria

const habveterinaria=async(req,res)=>{
    const codvet = req.params.codvet;
    console.log(codvet);
    const response=await pgconnection.query('update veterinarias set estado=true where codvet=$1',[
        codvet
    ]);
    res.json({mensaje:'Se habilito satisfactoriamente'})
}

//Asignar Persona a veterinaria
const asignarpervet=async(req,res)=>{
    try {
        const {codper,codvet} = req.body;
        const response=await pgconnection.query('insert into pervet(codper,codvet) values ($1,$2)',[
            codper,
            codvet
        ]);
        res.json({mensaje:'Se Asigno Satisfactoriamente'})
    } catch (error) {
        res.json({mensaje:'Error al guardar los datos'})
    }
}
//Eliminar Persona de veterinaria
const eliminarpervet=async(req,res)=>{
    try {
        const {codper,codvet} = req.body;
        console.log(codper,codvet);
        const response=await pgconnection.query('DELETE FROM pervet where codper=$1 and codvet=$2',[
            codper,
            codvet
        ]);
        res.json({mensaje:'Se elimino Satisfactoriamente'})
    } catch (error) {
        res.json({mensaje:'Error al guardar los datos'})
    }
}
//Listar veterinarias de un veterinario
const listarvetusu=async(req,res)=>{
    try {
    const codper = req.params.codper;
    const consulta='select v.codvet,v.nombre,v.imagen from veterinarias v,persona p, pervet pv where p.codper=$1 and p.codper=pv.codper and v.codvet=pv.codvet and (v.estado=true)';
    const response=await pgconnection.query(consulta,[codper]);
    res.json(response.rows)
    } catch (error) {
        res.json({mensaje:'Error al cargar los datos'})
    }
    
}

//Modulo para la app (abri y cerrar veterinaria)
const AbrirCerrarVet=async(req,res)=>{
    try {
    const {codvet,ac} = req.body;
    let mensaje='veterinaria abierta';
    if(!ac){mensaje='Veterinaria Cerrada'}
    const consulta='update veterinarias set ac=$1 where codvet=$2';
    const response=await pgconnection.query(consulta,[ac,codvet]);
    res.json({
        Mensaje:mensaje
    })
    } catch (error) {
        res.json({mensaje:'Error cambiar el estado'})
    }
    
}
//Modulo para la app (listar veterinarias abiertas)
const listarvetByAc=async(req,res)=>{
    try {
    const ac = req.params.ac;
    const consulta ='select * from veterinarias where ac=$1';
    const response = await pgconnection.query(consulta,[ac]);
    res.send(response.rows)
    } catch (error) {
        res.json({mensaje:'Error al obtener los datos'})
    }
    
}

//modulo para la app (modificar veterinaria)
const modvetapp=async(req,res)=>{
    try {
    const {codvet,atenciondom,descripcion,direccion,fechamod,horarioatencion,nombre,telefono,imagen} = req.body;
    const consulta ='update veterinarias set nombre=$1, telefono=$2, direccion=$3, descripcion=$4,fechamod=$5,atenciondom=$6,horarioatencion=$7,imagen=$8 where codvet=$9';
    const response = await pgconnection.query(consulta,[
        nombre.toUpperCase(),
        telefono,
        direccion.toUpperCase(),
        descripcion.toUpperCase(),
        fechamod,
        atenciondom,
        horarioatencion.toUpperCase(),
        imagen,
        codvet
    ]);
    res.json({
        mensaje:'Se actualizo satisfactoriamente'
    })
    } catch (error) {
        res.json({mensaje:'Error al obtener los datos'})
    }
    
}

//modulo para la app (listar veterinarias activas)
const listarvetByEstado=async(req,res)=>{
    const estado = req.params.estado;
    console.log(estado);
    const consulta ='select * from veterinarias where estado=$1';
    const response = await pgconnection.query(consulta,[estado]);
    res.send(response.rows)
}



//Reportes de Veterinarias
const ReporteVeterinarias = async (req, res) => {
    const {estado, mes } = req.body;
    if(estado==0 && mes==13){
        const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno from veterinarias v,persona p, pervet pv where (v.codvet=pv.codvet) and (p.codper=pv.codper)';
        const response = await pgconnection.query(consulta, []);
        res.json(response.rows)
    }else{
        if(estado==0){
            const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno from veterinarias v,persona p, pervet pv where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (extract(month from fechacre)=$1)';
            const response = await pgconnection.query(consulta, [
               mes
            ]);
            res.json(response.rows)
        }else{
            if(mes==13){
                const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno from veterinarias v,persona p, pervet pv where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.estado=$1)';
                const response = await pgconnection.query(consulta, [
                    estado
                ]);
                res.json(response.rows)
            }else{
                const consulta = 'select v.codvet,v.nombre,v.fechacre,v.telefono,p.codper,p.nombre as nombre_Usuario,p.ap as apellido_paterno,p.am as apellido_materno from veterinarias v,persona p, pervet pv where (v.codvet=pv.codvet) and (p.codper=pv.codper) and (v.estado=$1) and (extract(month from fechacre)=$2)';
                const response = await pgconnection.query(consulta, [
                    estado,
                    mes
                ]);
                res.json(response.rows)
            }
        }
    }
}   

module.exports ={
    listarvet,
    addveterinaria,
    delveterinaria,
    habveterinaria,
    asignarpervet,
    listarvetByCodvet,
    duenosveterinaria,
    Countvetrerinarias,
    updateveterinaria,
    eliminarpervet,
    listarvetusu,
    AbrirCerrarVet,
    listarvetByAc,
    modvetapp,
    listarvetByEstado,
    ReporteVeterinarias
}    