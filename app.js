const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
const whiteList = [ `http://localhost:${ process.env.PORT }` , process.env.URL_FRONT ] 
const options = {
    origin: ( origin, cb ) => {
        /**
         * solo pueden acceder url en whiteList o el mismo origen
         */
        if( whiteList.includes( origin ) || !origin ){
            cb(null, true)
        }else{
            cb(new Error('no permitido'))
        }
    }
}
app.use(cors(options))

// Directorio Publico
// app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/photos', require('./routes/photos') );

app.get('*',( req, res) => {
    console.log('no encontro endpoint', req)
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    })
    
})


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
