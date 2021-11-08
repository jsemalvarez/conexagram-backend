const axios = require('axios')

// const getPhotos = async() => {

//     try {     

//         return await axios.get('https://jsonplaceholder.typicode.com/photos')        

//     } catch (error) {
//         console.log(error)
//         throw new Error('')
//     }

// }

// module.exports = {
//     getPhotos
// }


/**
 * 
 * NOTA: en un primer momento, hice la manipulacion de datos de las fotos con funciones y luego,
 * como uso mongoose para manipular los datos de los usuarios, creo que una clase mantendria un codigo mas cohesivo en esta capa del sistema 
 * 
 */
class Photo{

    constructor(){

        this.url = 'https://jsonplaceholder.typicode.com/photos'

    }

    async getPhotos(){
        
        try {     

            return await axios.get(this.url)        

        } catch (error) {
            throw new Error(error)
        }

    }
}

module.exports =  Photo