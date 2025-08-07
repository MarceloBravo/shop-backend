import GetPageMenuTiendaService from '../../../../src/services/menuTienda/GetPageMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');

describe('GetPageMenuTiendaService', () => {
    let getPageMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getPage = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        getPageMenuTiendaService = new GetPageMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería obtener una pagina de menus de tienda correctamente', async () => {
        const mockMenuTienda = { rows: [{ id: 1, menu_id: 1, tienda_id: 1, activo: true }], count: 1 };
        mockMenuTiendaRepository.getPage.mockResolvedValue(mockMenuTienda);

        const result = await getPageMenuTiendaService.execute(1, 10);

        expect(result).toEqual({ ...mockMenuTienda, totPag: 1 });
        expect(mockMenuTiendaRepository.getPage).toHaveBeenCalledWith(0, 10, true);
    });

    test('debería obtener una pagina de menus de tienda incluyendo los eliminados', async () => {
        const mockMenuTienda = { rows: [{ id: 1, menu_id: 1, tienda_id: 1, activo: true }], count: 1 };
        mockMenuTiendaRepository.getPage.mockResolvedValue(mockMenuTienda);

        const result = await getPageMenuTiendaService.execute(1, 10, false);

        expect(result).toEqual({ ...mockMenuTienda, totPag: 1 });
        expect(mockMenuTiendaRepository.getPage).toHaveBeenCalledWith(0, 10, false);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});