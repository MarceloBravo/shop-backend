import { genero as enumGenero } from '../../enum/genero.js';

const validaDatos = (data) => {
    let errors = [];
    const { genero } = data;    
    if(!genero || genero.trim().length ===  0 || !Object.values(enumGenero).includes(genero)){
        errors.push("El genero es obligatorio y debe ser uno de los siguientes: 'Masculino', 'Femenino', 'Unisex' o 'No aplica'.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default validaDatos;