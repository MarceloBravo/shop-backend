import CreateAccionesPantallaService from '../../../../src/services/accionesPantalla/CreateAccionesPantallaService.js';

// Mock de la función de validación para simular errores
jest.mock('../../../../src/services/accionesPantalla/validaDatos.js', () => jest.fn((data) => {
    if (!data || !data.nombre) {
        const error = new Error('Datos no válidos:');
        error.code = 400;
        throw error;
    }
    return data;
}));
import validaDatos from '../../../../src/services/accionesPantalla/validaDatos.js';

describe('CreateAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        create: jest.fn()
    };
    let createAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        createAccionesPantallaService = new CreateAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateAccionesPantallaService()).toThrow('El repositorio es requerido');
    });

    test('debería crear una acción de pantalla correctamente', async () => {
        const data = { nombre: 'VER', pantalla_id: 1 };
        const mockAccion = { id: 1, nombre: 'VER', pantalla_id: 1 };
        mockAccionesPantallaRepository.create.mockResolvedValue(mockAccion);

        const result = await createAccionesPantallaService.execute(data);

        expect(result).toEqual(mockAccion);
        expect(validaDatos).toHaveBeenCalledWith(data);
        expect(mockAccionesPantallaRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { };
        await expect(createAccionesPantallaService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockAccionesPantallaRepository.create).not.toHaveBeenCalled();
    });
}); 