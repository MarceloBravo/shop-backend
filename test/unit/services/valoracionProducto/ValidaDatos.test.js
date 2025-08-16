import validaDatos from '../../../../src/services/ValoracionProducto/ValidaDatos.js';

describe('validaDatos', () => {

    const callValidaDatos = (data, isUpdate = false) => {
        try {
          validaDatos(data, isUpdate);
          return null; // No error thrown
        } catch (error) {
          return {
            code: error.code,
            error: error.message,
            details: error.details
          }
        }
      };

    it('no debe lanzar un error si los datos son válidos', () => {
        const data = {
            producto_id: 1,
            estrellas: 5,
            comentario: 'Excelente producto'
        };
        expect(() => validaDatos(data)).not.toThrow();
    });

    it('debe lanzar un error si la calificación no es válida', () => {
        const data = {
            producto_id: 1,
            estrellas: 6,
            comentario: 'Excelente producto'
        };
        const response = callValidaDatos(data);
        expect(response.code).toBe(400);
        expect(response.error).toBe('Datos no válidos:');
        expect(response.details[0]).toBe('No a calificado el producto. Debe ser un número entre 1 y 5.'); 
    });

    it('debe lanzar un error si el id del producto no está definido', () => {
        const data = {
            estrellas: 5,
            comentario: 'Excelente producto'
        };
        const response = callValidaDatos(data);
        expect(response.code).toBe(400);
        expect(response.error).toBe('Datos no válidos:');
        expect(response.details[0]).toBe('El producto es requerido.');
    });

    it('debe lanzar un error si el comentario no es una cadena de texto', () => {
        const data = {
            producto_id: 1,
            estrellas: 5,
            comentario: 123
        };
        const response = callValidaDatos(data);
        expect(response.code).toBe(400);
        expect(response.error).toBe('Datos no válidos:');
        expect(response.details[0]).toBe('El comentario debe ser una cadena de texto.');
    });
});