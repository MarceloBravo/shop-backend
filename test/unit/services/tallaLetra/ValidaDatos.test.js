import validaDatos from '../../../../src/services/tallaLetra/validaDatos.js';

describe('validaDatos', () => {
    test('no lanza error si el valor es válido', () => {
        expect(() => validaDatos({ valor: 'M' })).not.toThrow();
    });

    test('lanza error si el valor está vacío', () => {
        expect(() => validaDatos({ valor: '' })).toThrow('Datos no válidos:');
    });

    test('lanza error si el valor es muy largo', () => {
        expect(() => validaDatos({ valor: 'A'.repeat(31) })).toThrow('Datos no válidos:');
    });

    test('lanza error si el valor es solo espacios', () => {
        expect(() => validaDatos({ valor: '   ' })).toThrow('Datos no válidos:');
    });
}); 