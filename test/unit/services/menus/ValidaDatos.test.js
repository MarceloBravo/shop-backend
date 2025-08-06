import validaDatos from '../../../../src/services/menu/validaDatos.js';
import MenuRepository from '../../../../src/repositories/MenuRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/MenuRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('validaDatos', () => {
    let mockMenuRepository;
    let mockPantallaRepository;

    beforeEach(() => {
        mockMenuRepository = new MenuRepository();
        mockPantallaRepository = new PantallaRepository();

        mockMenuRepository.getById = jest.fn();
        mockPantallaRepository.getById = jest.fn();

        MenuRepository.mockImplementation(() => mockMenuRepository);
        PantallaRepository.mockImplementation(() => mockPantallaRepository);
    });

    const validData = { nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 };

    test('no lanza error si los datos son válidos', async () => {
        mockMenuRepository.getById.mockResolvedValue({ id: 1 });
        mockPantallaRepository.getById.mockResolvedValue({ id: 1 });
        await expect(validaDatos(validData)).resolves.not.toThrow();
    });

    test('lanza error si el nombre está vacío', async () => {
        const data = { ...validData, nombre: '' };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('lanza error si el nombre es muy largo', async () => {
        const data = { ...validData, nombre: 'A'.repeat(51) };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    });

    test('lanza error si el menú padre no existe', async () => {
        mockMenuRepository.getById.mockResolvedValue(null);
        await expect(validaDatos(validData)).rejects.toThrow('Datos no válidos:');
    });

    test('lanza error si la pantalla no existe', async () => {
        mockMenuRepository.getById.mockResolvedValue({ id: 1 });
        mockPantallaRepository.getById.mockResolvedValue(null);
        await expect(validaDatos(validData)).rejects.toThrow('Datos no válidos:');
    });
});