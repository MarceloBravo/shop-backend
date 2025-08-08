import SoftDeletePantallaService from '../../../../src/services/pantalla/SoftDeletePantallaService.js';

describe('SoftDeletePantallaService', () => {
    const mockPantallaRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeletePantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeletePantallaService = new SoftDeletePantallaService(mockPantallaRepository);
    });

    test('debería borrar lógicamente un pantalla correctamente', async () => {
        const mockPantalla = { nombre: 'ADMIN', usri: 'admin' };
        const mockResult = { id: 1, result: true };
        mockPantallaRepository.getById.mockResolvedValue(mockPantalla);
        mockPantallaRepository.softDelete.mockResolvedValue(mockResult);

        const result = await softDeletePantallaService.execute(1);

        expect(result).toBe(mockResult);
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(1);
        expect(mockPantallaRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si la pantalla no existe', async () => {
        mockPantallaRepository.getById.mockResolvedValue(null);
        await expect(softDeletePantallaService.execute(99)).rejects.toThrow('Pantalla no encontrada');
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(99);
        expect(mockPantallaRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeletePantallaService()).toThrow('El repositorio es requerido');
    });
}); 