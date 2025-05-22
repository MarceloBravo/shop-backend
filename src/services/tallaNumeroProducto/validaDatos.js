import { getTallaNumero } from '../../repositories/TallaNumeroRepository.js';
import { getProducto } from '../../repositories/ProductoRepository.js';

const validaDatos = (data) => {
    let errors = [];
    const { producto_id, talla_numerica_id } = data;

    if(!producto_id || getProducto(producto_id) === null){
        errors.push("El número de la talla no es válido o no existe, especifíca un número de talla válido.");
    }
    if(!talla_numerica_id || getTallaNumero(talla_numerica_id) === null){
        errors.push("El número de la talla no es válido, especifíca un número de talla válido.");
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