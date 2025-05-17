import CategoriaRepository from "../../repositories/CategoriaRepository.js";

export const validaDatos = async (data) => {
    const errors = [];
    const { nombre, categoria_id } = data;

    if(!nombre || nombre.trim().length === 0 || nombre.length > 100){
        errors.push("El nombre ingresado no es válido, ingresa un nombre de hasta 100 carácteres.");
    }
    if(!categoria_id || await (new CategoriaRepository()).execute(categoria_id) === null){
        errors.push("La categoria ingresada no es váida o no existe, ingresa una categoría válida.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
}

export default validaDatos;