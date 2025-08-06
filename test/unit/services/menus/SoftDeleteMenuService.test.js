import SoftDeleteMenuService from '../../../../src/services/menu/SoftDeleteMenuService.js';

describe('SoftDeleteMenuService', () => {
    const mockMenuRepository = {
        getById: jest.fn(),
        softDelete: jest.fn()
    };
    let softDeleteMenuService;

    beforeEach(() => {
        jest.clearAllMocks();
        softDeleteMenuService = new SoftDeleteMenuService(mockMenuRepository);
    });

    test('debería borrar lógicamente un menu correctamente', async () => {
        const mockMenu = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 };
        const mockResult = { id: 1, result: true };
        mockMenuRepository.getById.mockResolvedValue(mockMenu);
        mockMenuRepository.softDelete.mockResolvedValue(mockResult);

        const result = await softDeleteMenuService.execute(1);

        expect(result).toBe(mockResult);
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(1);
        expect(mockMenuRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar error si el menu no existe', async () => {
        mockMenuRepository.getById.mockResolvedValue(null);
        await expect(softDeleteMenuService.execute(99)).rejects.toThrow('Menú no encontrado');
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(99);
        expect(mockMenuRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteMenuService()).toThrow('El repositorio es requerido');
    });
}); 