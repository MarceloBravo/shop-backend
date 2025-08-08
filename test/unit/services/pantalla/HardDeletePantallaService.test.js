import HardDeletePantallaService from '../../../../src/services/pantalla/HardDeletePantallaService.js';

describe('HardDeletePantallaService', () => {
    const mockPantallaRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeletePantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeletePantallaService = new HardDeletePantallaService(mockPantallaRepository);
    });

    test('debería borrar físicamente una pantalla correctamente', async () => {
        const mockPantalla = { nombre: 'ADMIN', uri: 'admin' };
        const mockResult = { success: true };
        mockPantallaRepository.getById.mockResolvedValue(mockPantalla);
        mockPantallaRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeletePantallaService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockPantallaRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si la pantalla no existe', async () => {
        mockPantallaRepository.getById.mockResolvedValue(null);
        await expect(hardDeletePantallaService.execute(99)).rejects.toThrow('Pantalla no encontrada');
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockPantallaRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeletePantallaService()).toThrow('El repositorio es requerido');
    });
}); 