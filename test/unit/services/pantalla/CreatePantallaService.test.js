import CreatePantallaService from '../../../../src/services/pantalla/CreatePantallaService.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('CreatePantallaService', () => {
    let createPantallaService;
    let mockPantallaRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        mockPantallaRepository = new PantallaRepository();

        // Asignar mocks a los métodos
        mockPantallaRepository.getBy = jest.fn();
        mockPantallaRepository.getById = jest.fn();
        mockPantallaRepository.create = jest.fn();
        mockPantallaRepository.getById = jest.fn();

        PantallaRepository.mockImplementation(() => mockPantallaRepository);
        PantallaRepository.mockImplementation(() => mockPantallaRepository);

        createPantallaService = new CreatePantallaService(mockPantallaRepository);
    });

    test('debería crear un pantalla correctamente', async () => {
        const data = { nombre: 'ADMIN', uri: 'admin' };
        const mockPantalla = { id: 1, ...data };

        mockPantallaRepository.getBy.mockResolvedValue(undefined);
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