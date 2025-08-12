import SoftDeleteTallaNumeroService from '../../../../src/services/tallaNumero/SoftDeleteTallaNumeroService.js';

describe('SoftDeleteTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteTallaNumeroService = new SoftDeleteTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería borrar lógicamente un tallaNumero correctamente', async () => {
        const mockTallaNumero = { id: 1, valor: 42.5 };
        const mockDeleted = { deleted_at: new Date() };
        mockTallaNumeroRepository.getById.mockResolvedValue(mockTallaNumero);
        mockTallaNumeroRepository.softDelete.mockResolvedValue(mockDeleted);

        const result = await softDeleteTallaNumeroService.execute(1);

        expect(result).toBe(mockDeleted);
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(1);
        expect(mockTallaNumeroRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el tallaNumero no existe', async () => {
        mockTallaNumeroRepository.getById.mockResolvedValue(null);
        await expect(softDeleteTallaNumeroService.execute(99)).rejects.toThrow('Registro no encontrado');
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(99);
        expect(mockTallaNumeroRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 