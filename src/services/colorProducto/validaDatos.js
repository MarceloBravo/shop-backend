import ColorRepository from '../../repositories/ColorRepository.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';

const validaDatos = async (data, paranoid = true, transaction = null) => {
    let errors = [];
    const { producto_id, color_id } = data;

    if(!producto_id || await (new ProductoRepository()).getById(producto_id, paranoid, transaction) === null){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!color_id || await (new ColorRepository()).getById(color_id, paranoid, transaction) === null){
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