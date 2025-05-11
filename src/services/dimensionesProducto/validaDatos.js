import { getTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';
import { getProducto } from '../../repositories/producto.repository.js';

const validaDatos = (data) => {
    let errors = [];
    const { producto_id, alto, ancho, profundo, tipo_dimension_id } = data;

    if(!producto_id || getProducto(producto_id) === null){
        errors.push("El producto no es válido o no existe, especifíca un producto válido.");
    }
    if(!alto && !ancho && !profundo && tipo_dimension_id){
        errors.push("Datos incompletos: Se ha especificado una unidad pero no las dimensiones del producto.");
    }
    if(alto && (parseInt(alto) === NaN || alto <=0)){
        errors.push("El alto ingresado no es válido, ingresa sólo números positivos.");
    }
    if(ancho && (parseInt(ancho) === NaN || ancho <=0)){
        errors.push("El ancho ingresado no es válido, ingresa sólo números positivos.");
    }
    if(profundo && (parseInt(profundo) === NaN || profundo <=0)){
        errors.push("La profundidad ingresada no es válida, ingresa sólo números positivos.");
    }
    if(getTipoDimensiones(tipo_dimension_id) === null){
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