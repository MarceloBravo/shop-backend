import validaDatos from '../../../../src/services/pantalla/validaDatos.js';

describe('validaDatos', () => {

    const validData = { nombre: 'ADMIN', uri: 'admin' };

    test('no lanza error si los datos son válidos', () => {
        expect(() => validaDatos(validData)).not.toThrow();
    });

    test('lanza error si el nombre está vacío', () => {
        const data = { ...validData, nombre: '' };
        expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    });

    test('lanza error si el nombre es muy largo', () => {
        const data = { ...validData, nombre: 'A'.repeat(51) };
        expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    });

    test('lanza error si la URI está vacía', () => {
        const data = { ...validData, uri: '' };
        expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    });

    test('lanza error si la URI es muy larga', () => {
        const data = { ...validData, uri: 'A'.repeat(501) };    
        expect(() => validaDatos(data)).toThrow('Datos no válidos:');
    });
});