const express = require('express');
const app=express();
const bodyParser=require('body-parser');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({origin:true,credentials:true}))
app.use('*',cors());

//Routes
const userRoute = require('./api/routes/usuarios');
const autenticacionRoute = require('./api/routes/autenticacion');
const rol = require('./api/routes/roles');
const vet = require('./api/routes/veterinarias');
const proc=require('./api/routes/procesos');
const anuncio=require('./api/routes/anuncios');
app.use('/usuarios',userRoute);
app.use('/autenticacion',autenticacionRoute);
app.use('/roles',rol);
app.use('/veterinarias',vet);
app.use('/procesos',proc);
app.use('/anuncios',anuncio);
module.exports = app;




//Configuracion anterior

// const express = require('express');
// const app=express();
// const bodyParser=require('body-parser');
// const cors = require('cors');


// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// app.use(cors());

// //Routes
// const userRoute = require('./api/routes/usuarios');
// const autenticacionRoute = require('./api/routes/autenticacion');
// const rol = require('./api/routes/roles');
// const vet = require('./api/routes/veterinarias');
// app.use('/usuarios',userRoute);
// app.use('/autenticacion',autenticacionRoute);
// app.use('/roles',rol);
// app.use('/veterinarias',vet)

// module.exports = app;
