const { response } = require('express');
const axios = require('axios')

const Photo = require('../models/Photo');


const getPhotos = async( req, res = response ) => {
      
      const offset  = ( req.query?.offset ) ?  req.query.offset :  0
      const limit  = ( req.query?.limit ) ?  req.query?.limit : 10
   
    try {     

        const response = await new Photo().getPhotos()
       
        res.json({
            count: response.data.length, 
            results: response.data.splice( offset, limit )
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getPhotos
}
