import { getColor } from '../../repositories/ColorRepository.js';
import { getProducto } from '../../repositories/ProductoRepository.js';

const validaDatos = (data) => {
    let errors = [];
    const { producto_id, color_id } = data;

    if(!producto_id || getProducto(producto_id) === null){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!color_id || getColor(color_id) === null){
        errors.push("El color no es válido, especifíca un color válido.");
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