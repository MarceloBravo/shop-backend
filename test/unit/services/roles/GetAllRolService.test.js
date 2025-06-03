import GetAllRolService from '../../../../src/services/Rol/GetAllRolService.js';

describe('GetAllRolService', () => {
    // Crear el mock del repositorio
    const mockRolRepository = {
        getAllRol: jest.fn()
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
        mockRolRepository.getAllRol.mockResolvedValue(mockRoles);

        // Act
        const result = await getAllRolService.getAllRol();

        // Assert
        expect(result).toEqual(mockRoles);
        expect(mockRolRepository.getAllRol).toHaveBeenCalled();
        expect(mockRolRepository.getAllRol).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockRolRepository.getAllRol.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllRolService.getAllRol())
            .rejects
            .toThrow(expectedError);
        expect(mockRolRepository.getAllRol).toHaveBeenCalled();
    });
}); 