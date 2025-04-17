import { createCategoria } from "../../repositories/categoria.repository.js";

const createCategoriaService = async (data) => {
    validaDatos(data);
    return await createCategoria(data);
}

const validaDatos = (data) => {
    let errors = [];
    const { nombre, descripcion } = data;
    if (!nombre || nombre.trim().length === 0 || nombre.length < 30) {
        errors.push("Ingresa un nombre válido para el nombre de la categoría.");
    }
    if (!descripcion || descripcion.trim().length === 0) {
        errors.push("Ingresa un valor válido para la descripción de la categoría.");
    }
    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
    
}

export default createCategoriaService;