import UpdateMenuService from '../../../../src/services/menu/UpdateMenuService.js';
import MenuRepository from '../../../../src/repositories/MenuRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/MenuRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('UpdateMenuService', () => {
    let updateMenuService;
    let mockMenuRepository;
    let mockPantallaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuRepository = new MenuRepository();
        mockPantallaRepository = new PantallaRepository();

        // Asignar mocks a los métodos
        mockMenuRepository.getById = jest.fn();
        mockMenuRepository.update = jest.fn();
        mockPantallaRepository.getById = jest.fn();

        MenuRepository.mockImplementation(() => mockMenuRepository);
        PantallaRepository.mockImplementation(() => mockPantallaRepository);

        updateMenuService = new UpdateMenuService(mockMenuRepository);
    });

    test('debería actualizar un menu correctamente', async () => {
        const menuId = 1;
        const data = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 2, uri: '/admin', posicion: 10, pantalla_id: 1 };
        const mockMenuPadre = { id: 2, nombre: 'Menu Padre' };
        const mockPantalla = { id: 1, nombre: 'Pantalla Valida' };
        const mockUpdatedMenu = { id: menuId, ...data };

        // Configurar los mocks para que las validaciones pasen
        mockMenuRepository.getById.mockResolvedValue(mockMenuPadre);
        mockPantallaRepository.getById.mockResolvedValue(mockPantalla);
        mockMenuRepository.update.mockResolvedValue(mockUpdatedMenu);

        const result = await updateMenuService.execute(menuId, data);

        expect(result).toEqual(mockUpdatedMenu);
        expect(mockMenuRepository.getById).toHaveBeenCalledWith(data.menu_padre_id);
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(data.pantalla_id);
        expect(mockMenuRepository.update).toHaveBeenCalledWith(menuId, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '', icono: '', menu_padre_id: null, uri: '', posicion: null, pantalla_id: null };
        await expect(updateMenuService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockMenuRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateMenuService()).toThrow('El repositorio es requerido');
    });

    test('debería lanzar un error si el menú intenta ser padre de sí mismo', async () => {
        const menuId = 1;
        const data = { nombre: 'ADMIN', icono: 'path/to/icono.ico', menu_padre_id: 1, uri: '/admin', posicion: 1, pantalla_id: 1 };

        await expect(updateMenuService.execute(menuId, data)).rejects.toThrow('Datos no válidos:');
        expect(mockMenuRepository.update).not.toHaveBeenCalled();
    });
});
