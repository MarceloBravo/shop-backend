import HardDeleteAccionesPantallaService from '../../../../src/services/accionesPantalla/HardDeleteAccionesPantallaService.js';

describe('HardDeleteAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteAccionesPantallaService = new HardDeleteAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería borrar físicamente una acción de pantalla correctamente', async () => {
        const mockAccion = { id: 1, nombre: 'VER' };
        const mockResult = { success: true };
        mockAccionesPantallaRepository.getById.mockResolvedValue(mockAccion);
        mockAccionesPantallaRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteAccionesPantallaService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockAccionesPantallaRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 