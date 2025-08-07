import validaDatos from '../../../../src/services/menuTienda/validaDatos.js';
import MenuTiendaRepository from '../../../../src/repositories/MenuTiendaRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/MenuTiendaRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('validaDatos', () => {
    let mockMenuTiendaRepository;
    let mockPantallaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMenuTiendaRepository = new MenuTiendaRepository();
        mockMenuTiendaRepository.getById = jest.fn();
        MenuTiendaRepository.mockImplementation(() => mockMenuTiendaRepository);

        mockPantallaRepository = new PantallaRepository();
        mockPantallaRepository.getById = jest.fn();
        PantallaRepository.mockImplementation(() => mockPantallaRepository);
    });

    test('debería validar datos válidos sin errores', async () => {
        const data = { nombre: 'Menu Test', icono: 'icon.png', menuTienda_padre_id: 1, pantalla_id: 1 };
        mockMenuTiendaRepository.getById.mockResolvedValue({});
        mockPantallaRepository.getById.mockResolvedValue({});

        await expect(validaDatos(data)).resolves.toBeUndefined();
    });

    test('debería lanzar error si el nombre es nulo o vacío', async () => {
        const data = { nombre: null };
        await expect(validaDatos(data)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["El nombre del menu de la tienda es obligatorio y debe tener un máximo de hasta 50 carácteres."]
        }));

        const data2 = { nombre: '' };
        await expect(validaDatos(data2)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["El nombre del menu de la tienda es obligatorio y debe tener un máximo de hasta 50 carácteres."]
        }));
    });

    test('debería lanzar error si el nombre es demasiado largo', async () => {
        const data = { nombre: 'a'.repeat(51) };
        await expect(validaDatos(data)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["El nombre del menu de la tienda es obligatorio y debe tener un máximo de hasta 50 carácteres."]
        }));
    });

    test('debería lanzar error si el icono es demasiado largo', async () => {
        const data = { nombre: 'Menu Test', icono: 'a'.repeat(501) };
        await expect(validaDatos(data)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["La ruta del icono es demasiado extensa, ubica la el icono del menu de la tienda en una carpeta mas accesible."]
        }));
    });

    test('debería lanzar error si menuTienda_padre_id es igual a id', async () => {
        const data = { nombre: 'Menu Test', menuTienda_padre_id: 1 };
        mockMenuTiendaRepository.getById.mockResolvedValue({}); // Mock to return a non-null value
        try {
            await validaDatos(data, 1);
            // If it reaches here, the test should fail
            fail('Expected validaDatos to throw an error');
        } catch (error) {
            expect(error.code).toBe(400);
            expect(error.details).toEqual(["El menu de la tienda no puede ser padre de si mismo, selecciona otro menú padre."]);
        }
    });

    test('debería lanzar error si menuTienda_padre_id no existe', async () => {
        const data = { nombre: 'Menu Test', menuTienda_padre_id: 999 };
        mockMenuTiendaRepository.getById.mockResolvedValue(null);

        await expect(validaDatos(data)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["El menú padre no existe o no fue encontrado, selecciona un menú padre válido."]
        }));
    });

    test('debería lanzar error si pantalla_id no existe', async () => {
        const data = { nombre: 'Menu Test', pantalla_id: 999 };
        mockPantallaRepository.getById.mockResolvedValue(null);

        await expect(validaDatos(data)).rejects.toEqual(expect.objectContaining({
            code: 400,
            details: ["La pantalla seleccionada no eiste o no es válida, selecciona una pantalla válida."]
        }));
    });
});