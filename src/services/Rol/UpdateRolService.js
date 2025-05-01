import { updateRol } from "../../repositories/rol.repository.js";

const updateRolService = async (id, data) => {
    try {
            validaDatos(data);
            const result = await updateRol(id, data);
            return result;
    } catch (error) {
        throw new Error("Error al actualizar el regístro: " + error.message);
    }
}

const validaDatos = (data) => {
    let errors = [];
    const { nombre } = data;
    if (!nombre || nombre.trim().length === 0 || nombre.length > 30) {
        errors.push("Ingresa un nombre válido para el nombre.");
    }
    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
    
}

export default updateRolService;