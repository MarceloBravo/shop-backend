import SoftDeleteRolPermisosService from '../../../../src/services/RolPermisos/SoftDeleteRolPermisosService.js';

describe('SoftDeleteRolPermisosService', () => {
    const mockRolPermisosRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteRolPermisosService = new SoftDeleteRolPermisosService(mockRolPermisosRepository);
    });

    test('debería borrar lógicamente un rol correctamente', async () => {
        const mockRolPermisos = { id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true }
        const mockDeleted = { id: 1, result: true };
        mockRolPermisosRepository.getById.mockResolvedValue(mockRolPermisos);
        mockRolPermisosRepository.softDelete.mockResolvedValue(mockDeleted);

        const result = await softDeleteRolPermisosService.execute(1);

        expect(result).toBe(mockDeleted);
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRolPermisosRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolPermisosRepository.getById.mockResolvedValue(null);
        await expect(softDeleteRolPermisosService.execute(99)).rejects.toThrow('Permisos no encontrados');
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(99);
        expect(mockRolPermisosRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 