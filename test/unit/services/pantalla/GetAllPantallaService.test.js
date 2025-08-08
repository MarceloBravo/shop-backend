import GetAllPantallaService from '../../../../src/services/pantalla/GetAllPantallaService.js';

describe('GetAllPantallaService', () => {
    // Crear el mock del repositorio
    const mockPantallaRepository = {
        getAll: jest.fn()
    };

    let getAllPantallaService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllPantallaService = new GetAllPantallaService(mockPantallaRepository);
    });

    test('debería obtener todos los pantallas correctamente', async () => {
        // Arrange
        const mockPantallas = [
            { id: 1, nombre: 'ADMIN', uri: 'admin' },
            { id: 2, nombre: 'USER', uri: 'usuarios' }
        ];
        mockPantallaRepository.getAll.mockResolvedValue(mockPantallas);

        // Act
        const result = await getAllPantallaService.execute();

        // Assert
        expect(result).toEqual(mockPantallas);
        expect(mockPantallaRepository.getAll).toHaveBeenCalled();
        expect(mockPantallaRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockPantallaRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllPantallaService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockPantallaRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllPantallaService()).toThrow('El repositorio es requerido');
    });
}); 