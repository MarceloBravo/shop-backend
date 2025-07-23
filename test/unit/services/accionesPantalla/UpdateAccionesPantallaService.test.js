import UpdateAccionesPantallaService from '../../../../src/services/accionesPantalla/UpdateAccionesPantallaService.js';

// Mock de la función de validación para simular errores
jest.mock('../../../../src/services/accionesPantalla/validaDatos.js', () => jest.fn((data) => {
    if (!data || !data.pantalla_id) {
        const error = new Error('Datos no válidos:');
        error.code = 400;
        throw error;
    }
    return data;
}));
import validaDatos from '../../../../src/services/accionesPantalla/validaDatos.js';

describe('UpdateAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        update: jest.fn()
    };
    let updateAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        updateAccionesPantallaService = new UpdateAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería actualizar una acción de pantalla correctamente', async () => {
        const data = { 
            pantalla_id: 1,
            permite_crear: false 
        };
        const mockAccion = { 
            id: 1, 
            pantalla_id: 1,
            permite_crear: false 
        };
        mockAccionesPantallaRepository.update.mockResolvedValue(mockAccion);

        const result = await updateAccionesPantallaService.execute(1, data, null);

        expect(result).toEqual(mockAccion);
        expect(validaDatos).toHaveBeenCalledWith(data);
        expect(mockAccionesPantallaRepository.update).toHaveBeenCalledWith(1, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { };
        await expect(updateAccionesPantallaService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockAccionesPantallaRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 