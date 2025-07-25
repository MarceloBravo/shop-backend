import MaterialRepository from '../../repositories/MaterialRepository.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';

const validaDatos = async (data) => {
    let errors = [];
    const { producto_id, material_id } = data;

    if(!producto_id || await (new ProductoRepository()).getById(producto_id) === null){
        errors.push("El material no es válido o no existe, especifíca un material válido.");
    }
    if(!material_id || await (new MaterialRepository()).getById(material_id) === null){
        errors.push("El material no es válido, especifíca un material válido.");
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