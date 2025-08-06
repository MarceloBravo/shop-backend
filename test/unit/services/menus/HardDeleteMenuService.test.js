import HardDeleteMenuService from '../../../../src/services/menu/HardDeleteMenuService.js';

describe('HardDeleteMenuService', () => {
    const mockMenuRepository = {
        getById: jest.fn(),
        hardDelete: jest.fn()
    };
    let hardDeleteMenuService;

    beforeEach(() => {
        jest.clearAllMocks();
        hardDeleteMenuService = new HardDeleteMenuService(mockMenuRepository);
    });

    test('debería borrar físicamente un menu correctamente', async () => {
        const mockMenu = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 };
        const mockResult = { success: true };
        mockMenuRepository.getById.mockResolvedValue(mockMenu);
        mockMenuRepository.hardDelete.mockResolvedValue(mockResult);

        const result = await hardDeleteMenuService.execute(1);

        expect(result).toEqual(mockResult);
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockMenuRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el menu no existe', async () => {
        mockMenuRepository.getById.mockResolvedValue(null);
        await expect(hardDeleteMenuService.execute(99)).rejects.toThrow('Menú no encontrado');
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(99, false);
        expect(mockMenuRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteMenuService()).toThrow('El repositorio es requerido');
    });
}); 