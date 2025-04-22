import { createAtributo } from '../../repositories/atributo.repository.js';

const createAtributoService = async (data) => {
    validaDatos(data);
    return await createAtributo(data);
}

const validaDatos = (data) => {
    let errors = [];
    const { nombre, valor_string, valor_numerico } = data;

    if(!nombre || nombre.trim().length ===  0 || nombre.length > 100){
        errors.push("El nombre del valor es obligatorio y debe tener un máximo de hasta 100 carácteres.");
    }
    if(
        (!valor_string || valor_string.trim().length === 0 || valor_string.trim().length > 500) &&
        (!valor_numerico || valor_string.trim().length === 0 || valor_numerico.trim().length > 500)
    ){
        errors.push("Debe ingresar un valor para el producto.");
    }

    if(typeof valor_numerico !== 'undefined' && isNaN(valor_numerico)){
        errors.push("El valor numérico debe ser un número.");
    }


    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }

    return data
}

export default createAtributoService;