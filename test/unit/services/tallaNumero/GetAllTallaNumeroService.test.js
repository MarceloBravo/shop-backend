import GetAllTallaNumeroService from '../../../../src/services/tallaNumero/GetAllTallaNumeroService.js';

describe('GetAllTallaNumeroService', () => {
    // Crear el mock del repositorio
    const mockTallaNumeroRepository = {
        getAll: jest.fn()
    };

    let getAllTallaNumeroService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllTallaNumeroService = new GetAllTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería obtener todos los tallaNumeroes correctamente', async () => {
        // Arrange
        const mockTallaNumeroes = [
            { id: 1, valor: 42.5 },
            { id: 2, valor: 39 }
        ];
        mockTallaNumeroRepository.getAll.mockResolvedValue(mockTallaNumeroes);

        // Act
        const result = await getAllTallaNumeroService.execute();

        // Assert
        expect(result).toEqual(mockTallaNumeroes);
        expect(mockTallaNumeroRepository.getAll).toHaveBeenCalled();
        expect(mockTallaNumeroRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockTallaNumeroRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllTallaNumeroService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockTallaNumeroRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 