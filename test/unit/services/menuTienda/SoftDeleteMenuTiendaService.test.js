import SoftDeleteMenuTiendaService from '../../../../src/services/menuTienda/SoftDeleteMenuTiendaService.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');

describe('SoftDeleteMenuTiendaService', () => {
    let softDeleteMenuTiendaService;
    let mockMenuTiendaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getById = jest.fn();
        mockMenuTiendaRepository.softDelete = jest.fn();

        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        softDeleteMenuTiendaService = new SoftDeleteMenuTiendaService(mockMenuTiendaRepository);
    });

    test('debería eliminar un menu de tienda correctamente', async () => {
        const mockMenuTienda = { id: 1, menu_id: 1, tienda_id: 1, activo: true };
        mockMenuTiendaRepository.getById.mockResolvedValue(mockMenuTienda);
        mockMenuTiendaRepository.softDelete.mockResolvedValue({ result: 1 });

        const result = await softDeleteMenuTiendaService.execute(1);

        expect(result).toEqual(1);
        expect(mockMenuTiendaRepository.getById).toHaveBeenCalledWith(1);
        expect(mockMenuTiendaRepository.softDelete).toHaveBeenCalledWith(1, null);
    });

    test('debería lanzar un error si el menu de tienda no existe', async () => {
        mockMenuTiendaRepository.getById.mockResolvedValue(null);

        await expect(softDeleteMenuTiendaService.execute(1)).rejects.toThrow('Registro Menú-Pantalla no encontrado');
        expect(mockMenuTiendaRepository.softDelete).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new SoftDeleteMenuTiendaService()).toThrow('El repositorio es requerido');
    });
});