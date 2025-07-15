import SoftDeleteRolService from '../../../../src/services/Rol/SoftDeleteRolService.js';

describe('SoftDeleteRolService', () => {
    const mockRolRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteRolService = new SoftDeleteRolService(mockRolRepository);
    });

    test('debería borrar lógicamente un rol correctamente', async () => {
        const mockRol = { id: 1, nombre: 'ADMIN' };
        const mockDeleted = { deleted_at: new Date() };
        mockRolRepository.getById.mockResolvedValue(mockRol);
        mockRolRepository.softDelete.mockResolvedValue(mockDeleted);

        const result = await softDeleteRolService.execute(1);

        expect(result).toBe(true);
        expect(mockRolRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRolRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolRepository.getById.mockResolvedValue(null);
        await expect(softDeleteRolService.execute(99)).rejects.toThrow('Rol no encontrado');
        expect(mockRolRepository.getById).toHaveBeenCalledWith(99);
        expect(mockRolRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteRolService()).toThrow('El repositorio es requerido');
    });
}); 