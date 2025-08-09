import CreatePantallaService from '../../../../src/services/pantalla/CreatePantallaService.js';

describe('CreatePantallaService', () => {
    let createPantallaService;
    const mockPantallaRepository = {
        getBy: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        getById: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        createPantallaService = new CreatePantallaService(mockPantallaRepository);
    });

    test('debería crear un pantalla correctamente', async () => {
        const data = { nombre: 'ADMIN', uri: 'admin' };
        const mockPantalla = { id: 1, ...data };

        mockPantallaRepository.getBy.mockResolvedValue(null);
        mockPantallaRepository.create.mockResolvedValue(mockPantalla);

        const result = await createPantallaService.execute(data);

        expect(result).toEqual(mockPantalla);
        expect(mockPantallaRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '', uri: null };
        await expect(createPantallaService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockPantallaRepository.create).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreatePantallaService()).toThrow('El repositorio es requerido');
    });
});