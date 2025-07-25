import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';

/**
 * Valida los datos de un registro de peso de producto
 * @param {Object} data - Datos a validar:
 *      @param {number} data.producto_id - ID del producto asociado
 *      @param {number} data.peso - Valor del peso
 *      @param {number} data.tipo_dimension_id - ID del tipo de dimensión (unidad de medida)
 * @returns {Object} Los datos validados
 * @throws {Error} Error con código 400 y detalles si la validación falla
 */
const validaDatos = async (data, paranoid = true, transaccion = null) => {
    let errors = [];
    const { producto_id, peso, tipo_dimension_id } = data;

    if(!producto_id || (await (new ProductoRepository()).getById(producto_id, paranoid, transaccion) === null)){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!peso || isNaN(peso) === true || peso <= 0){
        errors.push("El peso no es válido, indica un peso mayor a cero.");
    }
    if(!tipo_dimension_id || await (new TipoDimensionesRepository()).getById(tipo_dimension_id) === null){
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