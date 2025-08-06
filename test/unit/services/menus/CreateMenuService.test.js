import CreateMenuService from '../../../../src/services/menu/CreateMenuService.js';
import MenuRepository from '../../../../src/repositories/MenuRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/MenuRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('CreateMenuService', () => {
    let createMenuService;
    let mockMenuRepository;
    let mockPantallaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuRepository = new MenuRepository();
        mockPantallaRepository = new PantallaRepository();

        // Asignar mocks a los métodos
        mockMenuRepository.getBy = jest.fn();
        mockMenuRepository.getById = jest.fn();
        mockMenuRepository.create = jest.fn();
        mockPantallaRepository.getById = jest.fn();

        MenuRepository.mockImplementation(() => mockMenuRepository);
        PantallaRepository.mockImplementation(() => mockPantallaRepository);

        createMenuService = new CreateMenuService(mockMenuRepository);
    });

    test('debería crear un menu correctamente', async () => {
        const data = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 };
        const mockMenu = { id: 1, ...data };
        const mockMenuPadre = { id: 1, nombre: 'Menu Padre' };
        const mockPantalla = { id: 1, nombre: 'Pantalla Valida' };

        mockMenuRepository.getBy.mockResolvedValue(undefined);
        mockMenuRepository.getById.mockResolvedValue(mockMenuPadre);
        mockPantallaRepository.getById.mockResolvedValue(mockPantalla);
        mockMenuRepository.create.mockResolvedValue(mockMenu);

        const result = await createMenuService.execute(data);

        expect(result).toEqual(mockMenu);
        expect(mockMenuRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '', icono: '', menu_padre_id: null, uri: '', posicion: null, pantalla_id: null };
        await expect(createMenuService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockMenuRepository.create).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateMenuService()).toThrow('El repositorio es requerido');
    });
});