import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';

const validaDatos = async (data) => {
    let errors = [];
    const { producto_id, talla_letra_id } = data;

    if(!producto_id || await (new ProductoRepository()).getById(producto_id) === null){
        errors.push("La letra de la talla no es válida o no existe, especifíca una Letra de talla válida.");
    }
    if(!talla_letra_id || await (new TallaLetraRepository()).getById(talla_letra_id) === null){
        errors.push("La letra de la talla no es válida, especifíca una Letra de talla válida.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }

    return data
}

export default validaDatos;