import GetAllTallaLetraService from '../../../../src/services/tallaLetra/GetAllTallaLetraService.js';

describe('GetAllTallaLetraService', () => {
    // Crear el mock del repositorio
    const mockTallaLetraRepository = {
        getAll: jest.fn()
    };

    let getAllTallaLetraService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllTallaLetraService = new GetAllTallaLetraService(mockTallaLetraRepository);
    });

    test('debería obtener todos los tallaLetraes correctamente', async () => {
        // Arrange
        const mockTallaLetraes = [
            { id: 1, valor: 'M' },
            { id: 2, valor: 'L' }
        ];
        mockTallaLetraRepository.getAll.mockResolvedValue(mockTallaLetraes);

        // Act
        const result = await getAllTallaLetraService.execute();

        // Assert
        expect(result).toEqual(mockTallaLetraes);
        expect(mockTallaLetraRepository.getAll).toHaveBeenCalled();
        expect(mockTallaLetraRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockTallaLetraRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllTallaLetraService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockTallaLetraRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 