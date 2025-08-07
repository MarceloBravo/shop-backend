import CreateMenuTiendaService from '../../../../src/services/menuTienda/CreateMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';
import validaDatos from '../../../../src/services/menuTienda/validaDatos.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');
jest.mock('../../../../src/services/menuTienda/validaDatos.js');

describe('CreateMenuTiendaService', () => {
    let createMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.create = jest.fn();
        mockMenuTiendaRepository.getBy = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        createMenuTiendaService = new CreateMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería crear un menu de tienda correctamente', async () => {
        const data = { menu_id: 1, tienda_id: 1, activo: true };
        const mockMenuTienda = { id: 1, ...data };

        validaDatos.mockResolvedValue();
        mockMenuTiendaRepository.getBy.mockResolvedValue(null);
        mockMenuTiendaRepository.create.mockResolvedValue(mockMenuTienda);

        const result = await createMenuTiendaService.execute(data);

        expect(result).toEqual(mockMenuTienda);
        expect(validaDatos).toHaveBeenCalledWith(data);
        expect(mockMenuTiendaRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { menu_id: null, tienda_id: null, activo: null };
        const mockRejectError = new Error('Datos no válidos:');
        mockRejectError.code = 400;
        mockRejectError.details = ['Campo requerido'];

        validaDatos.mockImplementation(() => {
            throw mockRejectError;
        });

        await expect(createMenuTiendaService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockMenuTiendaRepository.create).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});