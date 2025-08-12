import validaDatos from '../../../../src/services/tallaNumero/validaDatos.js';

describe('validaDatos', () => {
    test('no lanza error si el valor es válido', () => {
        expect(() => validaDatos({ valor: 42.5 })).not.toThrow();
    });

    test('lanza error si el valor está vacío', () => {
        expect(() => validaDatos({ valor: null })).toThrow('Datos no válidos:');
    });

    test('lanza error si el valor es negativo', () => {
        expect(() => validaDatos({ valor: -1 })).toThrow('Datos no válidos:');
    });
    
    test('lanza error si el valor es mayor a 100', () => {
        expect(() => validaDatos({ valor: 101 })).toThrow('Datos no válidos:');
    });

    test('lanza error si el valor es solo espacios', () => {
        expect(() => validaDatos({ valor: '   ' })).toThrow('Datos no válidos:');
    });
}); 