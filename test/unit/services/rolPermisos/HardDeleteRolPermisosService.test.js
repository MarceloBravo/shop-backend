import HardDeleteRolPermisosService from '../../../../src/services/RolPermisos/HardDeleteRolPermisosService.js';

describe('HardDeleteRolPermisosService', () => {
    const mockRolPermisosRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteRolPermisosService = new HardDeleteRolPermisosService(mockRolPermisosRepository);
    });

    test('debería borrar físicamente un rol correctamente', async () => {
        const mockRolPermisos = {id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const mockResult = { success: true };
        mockRolPermisosRepository.getById.mockResolvedValue(mockRolPermisos);
        mockRolPermisosRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteRolPermisosService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRolPermisosRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolPermisosRepository.getById.mockResolvedValue(null);
        await expect(hardDeleteRolPermisosService.execute(99)).rejects.toThrow('Permisos no encontrados');
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockRolPermisosRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 