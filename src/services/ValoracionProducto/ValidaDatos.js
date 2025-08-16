import { MENSAJE_VALORACION_NO_VALIDA } from "../../shared/mensajes.js";

const validaDatos = (data) => {
    const { calificacion, comentario, id_producto, id_usuario } = data;

    if (calificacion === undefined || calificacion < 1 || calificacion > 5) {
        throw new Error(MENSAJE_VALORACION_NO_VALIDA);
    }

    if (comentario && typeof comentario !== 'string') {
        throw new Error('El comentario debe ser una cadena de texto.');
    }

    if (!id_producto || !id_usuario) {
        throw new Error('El id del producto y del usuario son requeridos.');
    }
}


export default validaDatos;