import validaDatos from '../../../../src/services/Rol/ValidaDatos.js.js';

describe('validaDatos', () => {
    test('no lanza error si el nombre es válido', () => {
        expect(() => validaDatos({ nombre: 'ADMIN' })).not.toThrow();
    });

    test('lanza error si el nombre está vacío', () => {
        expect(() => validaDatos({ nombre: '' })).toThrow('Datos no válidos:');
    });

    test('lanza error si el nombre es muy largo', () => {
        expect(() => validaDatos({ nombre: 'A'.repeat(31) })).toThrow('Datos no válidos:');
    });

    test('lanza error si el nombre es solo espacios', () => {
        expect(() => validaDatos({ nombre: '   ' })).toThrow('Datos no válidos:');
    });
}); 