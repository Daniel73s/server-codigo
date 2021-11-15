const pgconnection = require('../connection/connection');
const Bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try {
        const consulta = 'select u.clave,u.login,u.estado,p.codper,p.foto,p.nombre,p.ap,p.am,r.nombre as nombrerol,r.codrol from usuario u,persona p,rol r where (u.login=$1) and (u.codper=p.codper)and (u.codrol=r.codrol)'
        const { username, clave } = req.body;
        const user = await pgconnection.query(consulta, [username], (error, result) => {
            if (!error) {
                if (result.rows.length > 0) {
                    if (result.rows[0].estado) {
                        const validpass = Bcryptjs.compareSync(clave, result.rows[0].clave);
                        if (validpass) {
                            // let data = JSON.stringify(result.rows[0]);
                            let data = {
                                'login': result.rows[0].login,
                                'nombre': result.rows[0].nombre,
                                'ap': result.rows[0].ap,
                                'am': result.rows[0].am,
                                'codrol': result.rows[0].codrol,
                                'codper': result.rows[0].codper,
                                'foto': result.rows[0].foto
                            };
                            // console.log(data2);

                            const token = jwt.sign(JSON.stringify(data), 'Daniel');
                            // console.log("Este es el token => "+token);
                            res.json({ token });
                        } else {
                            res.send('Clave incorrecta')
                        }
                    } else {
                        res.send('Usuario desactivado')
                    }
                } else {
                    res.send('El usuario no existe')
                }
            } else {
                console.log(error);
            }
        });
    } catch (e) {
        res.send('ocurrio un error Verifique sus datos');
    }

}

const info = (req, res) => {
    console.log(req.data);
    res.json('Informacion secreta');
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('no autorizado');
    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, 'Daniel');
        req.data = content;
        next();
    } else {
        res.status(401).json('Token vacio');
    }
}
module.exports = {
    login,
    verifyToken,
    info
}