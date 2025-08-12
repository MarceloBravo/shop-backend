import SoftDeleteTallaLetraService from '../../../../src/services/tallaLetra/SoftDeleteTallaLetraService.js';

describe('SoftDeleteTallaLetraService', () => {
    const mockTallaLetraRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteTallaLetraService = new SoftDeleteTallaLetraService(mockTallaLetraRepository);
    });

    test('debería borrar lógicamente un tallaLetra correctamente', async () => {
        const mockTallaLetra = { id: 1, valor: 'M' };
        const mockDeleted = { deleted_at: new Date() };
        mockTallaLetraRepository.getById.mockResolvedValue(mockTallaLetra);
        mockTallaLetraRepository.softDelete.mockResolvedValue(mockDeleted);

        const result = await softDeleteTallaLetraService.execute(1);

        expect(result).toBe(mockDeleted);
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(1);
        expect(mockTallaLetraRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el tallaLetra no existe', async () => {
        mockTallaLetraRepository.getById.mockResolvedValue(null);
        await expect(softDeleteTallaLetraService.execute(99)).rejects.toThrow('Registro no encontrado');
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(99);
        expect(mockTallaLetraRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 