import GetPageRolPermisosService from '../../../../src/services/RolPermisos/GetPageRolPermisosService.js';

describe('GetPageRolPermisosService', () => {
    const mockRolPermisosRepository = {
        getPage: jest.fn()
    };
    let getPageRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageRolPermisosService = new GetPageRolPermisosService(mockRolPermisosRepository);
    });

    test('debería obtener una página de roles correctamente', async () => {
        const rows = [ 
            { id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true },
            { id: 2, rol_id: 1, acciones_pantalla_id: 2, crear: true, actualizar: false, eliminar: true, listar: true, ver: false },
            { id: 3, rol_id: 1, acciones_pantalla_id: 3, crear: true, actualizar: true, eliminar: false, listar: true, ver: true },
        ];
        const count = 3;
        mockRolPermisosRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageRolPermisosService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 2 });
        expect(mockRolPermisosRepository.getPage).toHaveBeenCalledWith(0, 2, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 