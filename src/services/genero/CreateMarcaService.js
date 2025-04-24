import { createGenero } from '../../repositories/genero.repository.js';
import { genero } from '../../enum/genero.js';

const createGeneroService = async (data) => {
    validaDatos(data);
    return await createGenero(data.nombre, data.logo);
}

const validaDatos = (data) => {
    let errors = [];
    const { genero } = data;
    genero = genero.toUpperCase();
    if(!genero || genero.trim().length ===  0 || !Object.values(genero).includes(genero)){
        errors.push("El genero es obligatorio y debe ser uno de los siguientes: 'Masculino', 'Femenino', 'Unisex' o 'No aplica'.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default createGeneroService;