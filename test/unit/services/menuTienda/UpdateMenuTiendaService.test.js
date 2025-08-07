import UpdateMenuTiendaService from '../../../../src/services/menuTienda/UpdateMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';
import validaDatos from '../../../../src/services/menuTienda/validaDatos.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');
jest.mock('../../../../src/services/menuTienda/validaDatos.js');

describe('UpdateMenuTiendaService', () => {
    let updateMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.update = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        updateMenuTiendaService = new UpdateMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería actualizar un menu de tienda correctamente', async () => {
        const data = { menu_id: 1, tienda_id: 1, activo: true };
        const mockMenuTienda = { id: 1, ...data };

        validaDatos.mockResolvedValue();
        mockMenuTiendaRepository.update.mockResolvedValue(mockMenuTienda);

        const result = await updateMenuTiendaService.execute(1, data);

        expect(result).toEqual(mockMenuTienda);
        expect(validaDatos).toHaveBeenCalledWith(data, 1);
        expect(mockMenuTiendaRepository.update).toHaveBeenCalledWith(1, data, null);
    });
    
    test('debería lanzar un error si los datos no son válidos', async () => {
        const data = { menu_id: null, tienda_id: null, activo: null };
        const mockRejectError = new Error('Datos no válidos:');
        mockRejectError.code = 400;
        mockRejectError.details = ['Campo requerido'];

        validaDatos.mockImplementation(() => {
            throw mockRejectError;
        });
    //validaDatos.mockRejectedValue({ message: 'Datos no válidos:', code: 400, details: ['Campo requerido'] });

        await expect(updateMenuTiendaService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockMenuTiendaRepository.update).not.toHaveBeenCalled();
    });
    
    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});