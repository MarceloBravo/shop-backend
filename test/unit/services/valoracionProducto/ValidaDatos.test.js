import validaDatos from '../../../../src/services/ValoracionProducto/ValidaDatos.js';
import { MENSAJE_VALORACION_NO_VALIDA } from '../../../../src/shared/mensajes.js';

describe('validaDatos', () => {

    it('no debe lanzar un error si los datos son válidos', () => {
        const data = {
            id_producto: 1,
            id_usuario: 1,
            calificacion: 5,
            comentario: 'Excelente producto'
        };
        expect(() => validaDatos(data)).not.toThrow();
    });

    it('debe lanzar un error si la calificación no es válida', () => {
        const data = {
            id_producto: 1,
            id_usuario: 1,
            calificacion: 6,
            comentario: 'Excelente producto'
        };
        expect(() => validaDatos(data)).toThrow(MENSAJE_VALORACION_NO_VALIDA);
    });

    it('debe lanzar un error si el id_producto no está definido', () => {
        const data = {
            id_usuario: 1,
            calificacion: 5,
            comentario: 'Excelente producto'
        };
        expect(() => validaDatos(data)).toThrow('El id del producto y del usuario son requeridos.');
    });

    it('debe lanzar un error si el id_usuario no está definido', () => {
        const data = {
            id_producto: 1,
            calificacion: 5,
            comentario: 'Excelente producto'
        };
        expect(() => validaDatos(data)).toThrow('El id del producto y del usuario son requeridos.');
    });

    it('debe lanzar un error si el comentario no es una cadena de texto', () => {
        const data = {
            id_producto: 1,
            id_usuario: 1,
            calificacion: 5,
            comentario: 123
        };
        expect(() => validaDatos(data)).toThrow('El comentario debe ser una cadena de texto.');
    });
});