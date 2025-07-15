import HardDeleteRolService from '../../../../src/services/Rol/HardDeleteRolService.js';

describe('HardDeleteRolService', () => {
    const mockRolRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteRolService = new HardDeleteRolService(mockRolRepository);
    });

    test('debería borrar físicamente un rol correctamente', async () => {
        const mockRol = { id: 1, nombre: 'ADMIN' };
        const mockResult = { success: true };
        mockRolRepository.getById.mockResolvedValue(mockRol);
        mockRolRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteRolService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockRolRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRolRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolRepository.getById.mockResolvedValue(null);
        await expect(hardDeleteRolService.execute(99)).rejects.toThrow('Rol no encontrado');
        expect(mockRolRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockRolRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteRolService()).toThrow('El repositorio es requerido');
    });
}); 