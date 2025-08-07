import GetByIdMenuTiendaService from '../../../../src/services/menuTienda/GetByIdMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');

describe('GetByIdMenuTiendaService', () => {
    let getByIdMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getById = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        getByIdMenuTiendaService = new GetByIdMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería obtener un menu de tienda por id correctamente', async () => {
        const mockMenuTienda = { id: 1, menu_id: 1, tienda_id: 1, activo: true };
        mockMenuTiendaRepository.getById.mockResolvedValue(mockMenuTienda);

        const result = await getByIdMenuTiendaService.execute(1);

        expect(result).toEqual(mockMenuTienda);
        expect(mockMenuTiendaRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería obtener un menu de tienda por id incluyendo los eliminados', async () => {
        const mockMenuTienda = { id: 1, menu_id: 1, tienda_id: 1, activo: true };
        mockMenuTiendaRepository.getById.mockResolvedValue(mockMenuTienda);

        const result = await getByIdMenuTiendaService.execute(1, false);

        expect(result).toEqual(mockMenuTienda);
        expect(mockMenuTiendaRepository.getById).toHaveBeenCalledWith(1, false);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});