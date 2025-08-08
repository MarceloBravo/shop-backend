import GetByIdRolPermisosService from '../../../../src/services/RolPermisos/GetByIdRolPermisosService.js';

describe('GetByIdRolPermisosService', () => {
    const mockRolPermisosRepository = {
        getById: jest.fn()
    };
    let getByIdRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdRolPermisosService = new GetByIdRolPermisosService(mockRolPermisosRepository);
    });

    test('debería obtener un rol por ID correctamente', async () => {
        const mockRolPermisos = {id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        mockRolPermisosRepository.getById.mockResolvedValue(mockRolPermisos);

        const result = await getByIdRolPermisosService.execute(1);

        expect(result).toEqual(mockRolPermisos);
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolPermisosRepository.getById.mockResolvedValue(null);
        await expect(getByIdRolPermisosService.execute(99)).rejects.toThrow('Permisos no encontrados');
        expect(mockRolPermisosRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 