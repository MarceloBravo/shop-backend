import { MENSAJE_VALORACION_NO_VALIDA } from "../../shared/mensajes.js";

const validaDatos = (data) => {
    const errors = [];
    const { estrellas, comentario, producto_id } = data;

    if (estrellas === undefined || estrellas < 1 || estrellas > 5) {
        errors.push('No a calificado el producto. Debe ser un número entre 1 y 5.');
    }

    if (comentario && typeof comentario !== 'string') {
        errors.push('El comentario debe ser una cadena de texto.');
    }

    if (!producto_id) {
        errors.push('El producto es requerido.');
    }

    if (errors.length > 0) {
        const error = new Error('Datos no válidos:');
        error.code = 400; // Bad Request
        error.details = errors;
        throw error;
    }
}


export default validaDatos;