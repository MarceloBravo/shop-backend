import { getTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';
import { getProducto } from '../../repositories/producto.repository.js';

const validaDatos = (data) => {
    let errors = [];
    const { producto_id, peso, tipo_dimension_id } = data;

    if(!producto_id || getProducto(producto_id) === null){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!peso || parseInt(peso) === NaN || peso <= 0){
        errors.push("El peso no es válido, indica un peso mayor a cero.");
    }
    if(!tipo_dimension_id || getTipoDimensiones(tipo_dimension_id) === null){
        errors.push("La unidad de medidas no es válidas, especifíca alguna unidad de medida válida.");
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