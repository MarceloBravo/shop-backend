import HardDeleteTallaNumeroService from '../../../../src/services/tallaNumero/HardDeleteTallaNumeroService.js';

describe('HardDeleteTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteTallaNumeroService = new HardDeleteTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería borrar físicamente un tallaNumero correctamente', async () => {
        const mockTallaNumero = { id: 1, valor: 42.5 };
        const mockResult = { success: true };
        mockTallaNumeroRepository.getById.mockResolvedValue(mockTallaNumero);
        mockTallaNumeroRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteTallaNumeroService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockTallaNumeroRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el tallaNumero no existe', async () => {
        mockTallaNumeroRepository.getById.mockResolvedValue(null);
        await expect(hardDeleteTallaNumeroService.execute(99)).rejects.toThrow('Talla numérica no encontrada');
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockTallaNumeroRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 