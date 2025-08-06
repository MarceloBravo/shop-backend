import GetPageMenuService from '../../../../src/services/menu/GetPageMenuService.js';

describe('GetPageMenuService', () => {
    const mockMenuRepository = {
        getPage: jest.fn()
    };
    let getPageMenuService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageMenuService = new GetPageMenuService(mockMenuRepository);
    });

    test('debería obtener una página de menus correctamente', async () => {
        const rows = [ 
            { id: 1, nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 },
            { id: 2, nombre: 'USER', icono: 'path/to/icono-user.ico', menu_padre_id: 1, uri: '/user', posicion: 20, pantalla_id: 2 }
         ];
        const count = 2;
        mockMenuRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageMenuService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 1 });
        expect(mockMenuRepository.getPage).toHaveBeenCalledWith(0, 2, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageMenuService()).toThrow('El repositorio es requerido');
    });
}); 