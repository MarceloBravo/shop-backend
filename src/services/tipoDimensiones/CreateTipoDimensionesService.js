import { createTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const createTipoDimensionesService = async (data) => {
    validaDatos(data);
    return await createTipoDimensiones(data);
}

const validaDatos = (data) => {
    let errors = [];
    const { nombre, nombre_corto } = data;

    if(!nombre || nombre.trim().length ===  0 || nombre.length > 30){
        errors.push("El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres.");
    }
    if(!nombre_corto || nombre_corto.trim().length ===  0 || nombre_corto.length > 30){
        errors.push("El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default createTipoDimensionesService;