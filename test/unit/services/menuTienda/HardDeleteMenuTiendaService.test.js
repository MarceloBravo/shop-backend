import HardDeleteMenuTiendaService from '../../../../src/services/menuTienda/HardDeleteMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');

describe('HardDeleteMenuTiendaService', () => {
    let hardDeleteMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getById = jest.fn();
        mockMenuTiendaRepository.hardDelete = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        hardDeleteMenuTiendaService = new HardDeleteMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería eliminar un menu de tienda correctamente', async () => {
        const mockMenuTienda = { id: 1, menu_id: 1, tienda_id: 1, activo: true };
        mockMenuTiendaRepository.getById.mockResolvedValue(mockMenuTienda);
        mockMenuTiendaRepository.hardDelete.mockResolvedValue(1);

        const result = await hardDeleteMenuTiendaService.execute(1);

        expect(result).toEqual(1);
        expect(mockMenuTiendaRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockMenuTiendaRepository.hardDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar un error si el menu de tienda no existe', async () => {
        mockMenuTiendaRepository.getById.mockResolvedValue(null);

        await expect(hardDeleteMenuTiendaService.execute(1)).rejects.toThrow('Registro Menú-Pantall no encontrado');
        expect(mockMenuTiendaRepository.hardDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new HardDeleteMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});