import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';

const validaDatos = async (data) => {
    let errors = [];
    const { producto_id, alto, ancho, profundo, tipo_dimension_id } = data;

    if(!producto_id || await (new ProductoRepository()).getById(producto_id) === null){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!alto && !ancho && !profundo && tipo_dimension_id){
        errors.push("Datos incompletos: Se ha especificado una unidad pero no las dimensiones del producto.");
    }
    if(alto && (isNaN(alto) === true || alto <=0)){
        errors.push("El alto ingresado no es válido, ingresa sólo números positivos.");
    }
    if(ancho && (isNaN(ancho) === true || ancho <=0)){
        errors.push("El ancho ingresado no es válido, ingresa sólo números positivos.");
    }
    if(profundo && (isNaN(profundo) === true || profundo <=0)){
        errors.push("La profundidad ingresada no es válida, ingresa sólo números positivos.");
    }
    if(await(new TipoDimensionesRepository()).getById(tipo_dimension_id) === null){
        errors.push("La undidad de medida ingresada no es válida, ingresa una unidad válida y existente.");
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