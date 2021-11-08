/*
    Event Routes
    /api/photos
*/
const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getPhotos } = require('../controllers/photos');


const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getPhotos );


module.exports = router;