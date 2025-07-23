import SoftDeleteAccionesPantallaService from '../../../../src/services/accionesPantalla/SoftDeleteAccionesPantallaService.js';

describe('SoftDeleteAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteAccionesPantallaService = new SoftDeleteAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería borrar lógicamente una acción de pantalla correctamente', async () => {
        const mockAccion = { id: 1, nombre: 'VER' };
        const mockDeleted = { deleted_at: new Date() };
        mockAccionesPantallaRepository.getById.mockResolvedValue(mockAccion);
        mockAccionesPantallaRepository.softDelete.mockResolvedValue(mockDeleted);

        const result = await softDeleteAccionesPantallaService.execute(1);

        expect(result).toEqual(mockDeleted);
        expect(mockAccionesPantallaRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 