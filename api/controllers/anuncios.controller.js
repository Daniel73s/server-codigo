const pgconnection = require('../connection/connection');
const listaAnuncios=async(req,res)=>{
    const consulta ='select a.codanuncio,a.titulo,a.texto,a.imagen as imganuncio ,a.estado,v.nombre,v.imagen from anuncio a , veterinarias v, vetanuncio va where (va.codvet=v.codvet) and (va.codanuncio=a.codanuncio)';
    const response = await pgconnection.query(consulta);
    res.send(response.rows)
}

const listaAnunciosporEstado=async(req,res)=>{
    const estado = req.params.estado;
    const consulta ='select a.codanuncio,a.fechacre,a.fechamod,a.titulo,a.texto,a.imagen as imganuncio,a.estado,v.nombre,v.imagen,v.codvet from anuncio a , veterinarias v, vetanuncio va where (va.codvet=v.codvet) and (va.codanuncio=a.codanuncio) and (a.estado=$1) and (v.estado=true)';
    const response = await pgconnection.query(consulta,[estado]);
    res.send(response.rows)
}

const listarAnunciosByCodvet=async(req,res)=>{
    const codvet = req.params.codvet;
    const consulta ='select a.codanuncio,a.titulo,a.texto,a.imagen,a.estado,a.fechacre,a.fechamod from anuncio a, veterinarias v, vetanuncio va where (v.codvet=$1) and (a.codanuncio=va.codanuncio) and (v.codvet=va.codvet)';
    const response = await pgconnection.query(consulta,[codvet]);
    res.json(response.rows)
}

const listaAnuncioByCodanuncio=async(req,res)=>{
    const codanuncio = req.params.codanuncio;
    const consulta ='select a.codanuncio,a.titulo,a.texto,a.imagen as imganuncio,a.estado,a.fechacre,a.estado,v.codvet,v.nombre,v.imagen from anuncio a , veterinarias v, vetanuncio va where (va.codvet=v.codvet) and (va.codanuncio=a.codanuncio) and (a.codanuncio=$1)';
    const response = await pgconnection.query(consulta,[codanuncio]);
    res.send(response.rows)
}

const CambiarEstadoAnuncio=async(req,res)=>{
    const {codanuncio,estado} = req.body;
    const consulta ='update anuncio set estado=$1 where codanuncio=$2';
    const response = await pgconnection.query(consulta,[estado,codanuncio]);
    res.json({
        mensaje:'Se cambio el estado satisfactoriamente'
    })
}
const crearAnuncio=async(req,res)=>{
    const {titulo,texto,imagen,fechacre} = req.body;
    const consulta ='insert into anuncio(titulo,texto,imagen,fechacre,fechamod) values ($1,$2,$3,$4,$5) RETURNING codanuncio';
    const response = await pgconnection.query(consulta,[titulo.toUpperCase(),texto.toUpperCase(),imagen,fechacre,fechacre]);
    res.json(response.rows);
}

const asignarAnuncioaVet=async(req,res)=>{
    const {codvet,codanuncio} = req.body;
    const consulta ='insert into vetanuncio(codvet,codanuncio) values ($1,$2)';
    const response = await pgconnection.query(consulta,[codvet,codanuncio]);
    res.json({mensaje:'Se creo satisfactoriamente'});
}

const actualizarAnuncio=async(req,res)=>{
    const {codanuncio,titulo,texto,fechamod,imagen} = req.body;
    const consulta ='update anuncio set titulo=$1, texto=$2, fechamod=$3, imagen=$4 where codanuncio=$5';
    const response = await pgconnection.query(consulta,[titulo.toUpperCase(),texto.toUpperCase(),fechamod,imagen,codanuncio]);
    res.json({mensaje:'Se actualizo satisfactoriamente'});
}


module.exports ={
   listaAnuncios,
   listaAnunciosporEstado,
   listarAnunciosByCodvet,
   listaAnuncioByCodanuncio,
   CambiarEstadoAnuncio,
   crearAnuncio,
   asignarAnuncioaVet,
   actualizarAnuncio
}    