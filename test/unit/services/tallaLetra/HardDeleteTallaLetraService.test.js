import HardDeleteTallaLetraService from '../../../../src/services/tallaLetra/HardDeleteTallaLetraService.js';

describe('HardDeleteTallaLetraService', () => {
    const mockTallaLetraRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteTallaLetraService = new HardDeleteTallaLetraService(mockTallaLetraRepository);
    });

    test('debería borrar físicamente un tallaLetra correctamente', async () => {
        const mockTallaLetra = { id: 1, valor: 'M' };
        const mockResult = { success: true };
        mockTallaLetraRepository.getById.mockResolvedValue(mockTallaLetra);
        mockTallaLetraRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteTallaLetraService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockTallaLetraRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el tallaLetra no existe', async () => {
        mockTallaLetraRepository.getById.mockResolvedValue(null);
        await expect(hardDeleteTallaLetraService.execute(99)).rejects.toThrow('Talla letra no encontrada');
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockTallaLetraRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 