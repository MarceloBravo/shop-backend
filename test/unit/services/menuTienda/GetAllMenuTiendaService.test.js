import GetAllMenuTiendaService from '../../../../src/services/menuTienda/GetAllMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');

describe('GetAllMenuTiendaService', () => {
    let getAllMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getAll = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        getAllMenuTiendaService = new GetAllMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería obtener todos los menus de tienda correctamente', async () => {
        const mockMenuTienda = [{ id: 1, menu_id: 1, tienda_id: 1, activo: true }];
        mockMenuTiendaRepository.getAll.mockResolvedValue(mockMenuTienda);

        const result = await getAllMenuTiendaService.execute();

        expect(result).toEqual(mockMenuTienda);
        expect(mockMenuTiendaRepository.getAll).toHaveBeenCalledWith(true);
    });

    test('debería obtener todos los menus de tienda incluyendo los eliminados', async () => {
        const mockMenuTienda = [{ id: 1, menu_id: 1, tienda_id: 1, activo: true }];
        mockMenuTiendaRepository.getAll.mockResolvedValue(mockMenuTienda);

        const result = await getAllMenuTiendaService.execute(false);

        expect(result).toEqual(mockMenuTienda);
        expect(mockMenuTiendaRepository.getAll).toHaveBeenCalledWith(false);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});