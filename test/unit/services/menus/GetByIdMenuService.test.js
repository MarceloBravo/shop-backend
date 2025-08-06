import GetByIdMenuService from '../../../../src/services/menu/GetByIdMenuService.js';

describe('GetByIdMenuService', () => {
    const mockMenuRepository = {
        getById: jest.fn()
    };
    let getByIdMenuService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdMenuService = new GetByIdMenuService(mockMenuRepository);
    });

    test('debería obtener un menu por ID correctamente', async () => {
        const mockMenu = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 };
        mockMenuRepository.getById.mockResolvedValue(mockMenu);

        const result = await getByIdMenuService.execute(1);

        expect(result).toEqual(mockMenu);
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el menu no existe', async () => {
        mockMenuRepository.getById.mockResolvedValue(null);
        await expect(getByIdMenuService.execute(99)).rejects.toThrow('Menú no encontrado');
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdMenuService()).toThrow('El repositorio es requerido');
    });
}); 