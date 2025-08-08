import GetByIdPantallaService from '../../../../src/services/pantalla/GetByIdPantallaService.js';

describe('GetByIdPantallaService', () => {
    const mockPantallaRepository = {
        getById: jest.fn()
    };
    let getByIdPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdPantallaService = new GetByIdPantallaService(mockPantallaRepository);
    });

    test('debería obtener un pantalla por ID correctamente', async () => {
        const mockPantalla = { nombre: 'ADMIN', uri: 'admin' };
        mockPantallaRepository.getById.mockResolvedValue(mockPantalla);

        const result = await getByIdPantallaService.execute(1);

        expect(result).toEqual(mockPantalla);
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si la pantalla no existe', async () => {
        mockPantallaRepository.getById.mockResolvedValue(null);
        await expect(getByIdPantallaService.execute(99)).rejects.toThrow('Pantalla no encontrada');
        expect(mockPantallaRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdPantallaService()).toThrow('El repositorio es requerido');
    });
}); 