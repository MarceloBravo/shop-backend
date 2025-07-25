import GetAllRolService from '../../../../src/services/Rol/GetAllRolService.js';

describe('GetAllRolService', () => {
    // Crear el mock del repositorio
    const mockRolRepository = {
        getAll: jest.fn()
    };

    let getAllRolService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllRolService = new GetAllRolService(mockRolRepository);
    });

    test('debería obtener todos los roles correctamente', async () => {
        // Arrange
        const mockRoles = [
            { id: 1, nombre: 'ADMIN' },
            { id: 2, nombre: 'USER' }
        ];
        mockRolRepository.getAll.mockResolvedValue(mockRoles);

        // Act
        const result = await getAllRolService.execute();

        // Assert
        expect(result).toEqual(mockRoles);
        expect(mockRolRepository.getAll).toHaveBeenCalled();
        expect(mockRolRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockRolRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllRolService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockRolRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllRolService()).toThrow('El repositorio es requerido');
    });
}); 