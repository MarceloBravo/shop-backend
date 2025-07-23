import validaDatos from '../../../../src/services/accionesPantalla/validaDatos.js';

jest.mock('../../../../src/repositories/AccionesPantallaRepository.js', () => {
    return jest.fn().mockImplementation(() => ({
        getById: jest.fn((id) => id === 1 ? { id: 1 } : null)
    }));
});


describe('validaDatos', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debería retornar los datos si son válidos', async () => {
        const data = {
            pantalla_id: 1,
            permite_crear: true,
            permite_actualizar: false,
            permite_eliminar: true,
            permite_listar: false,
            acceso: true
        };
        await expect(validaDatos(data)).resolves.toEqual(data);
    });

    test('debería lanzar error si pantalla_id no existe', async () => {
        const data = {
            pantalla_id: null,
            permite_crear: true,
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('debería lanzar error si permite_crear no es boolean', async () => {
        const data = {
            pantalla_id: 1,
            permite_crear: 'si'
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('debería lanzar error si permite_actualizar no es boolean', async () => {
        const data = {
            pantalla_id: 1,
            permite_actualizar: 'no'
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('debería lanzar error si permite_eliminar no es boolean', async () => {
        const data = {
            pantalla_id: 1,
            permite_eliminar: 123
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('debería lanzar error si permite_listar no es boolean', async () => {
        const data = {
            pantalla_id: 1,
            permite_listar: 'ABC'
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('debería lanzar error si acceso no es boolean', async () => {
        const data = {
            pantalla_id: 1,
            acceso: 'true'
        };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });
}); 