import RolRepository from "../../repositories/RolRepository.js";
import PantallaRepository from '../../repositories/PantallaRepository.js';

const validaDatos = async (data) => {
    let errors = [];
    const { rol_id, acciones_pantalla_id, crear, eliminar, actualizar, listar, ver } = data;
    if (!rol_id || (await (new RolRepository()).getById(rol_id)) === null) {
        errors.push("El 'rol' no es válido o no existe.");
    }
    if (!rol_id || (await (new PantallaRepository()).getById(acciones_pantalla_id)) === null) {
        errors.push("La 'pantalla' no es válida o no existe.");
    }
    if (crear === undefined || crear === null) {
        errors.push("El campo 'crear' es obligatorio.");
    }
    if (actualizar === undefined || actualizar === null) {
        errors.push("El campo 'actualizar' es obligatorio.");
    }
    if (eliminar === undefined || eliminar === null) {
        errors.push("El campo 'eliminar' es obligatorio.");
    }
    if (listar === undefined || listar === null) {
        errors.push("El campo 'listar' es obligatorio.");
    }
    if (ver === undefined || ver === null) {
        errors.push("El campo 'ver' es obligatorio.");
    }

    if(errors.length > 0){
        const error = new Error('Datos no válidos:');
        error.code = 400;
        error.details = errors;
        throw error;
    }
    
}

export default validaDatos;