import GetAllRolPermisosService from '../../../../src/services/RolPermisos/GetAllRolPermisosService.js';

describe('GetAllRolPermisosService', () => {
    // Crear el mock del repositorio
    const mockRolPermisosRepository = {
        getAll: jest.fn()
    };

    let getAllRolPermisosService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllRolPermisosService = new GetAllRolPermisosService(mockRolPermisosRepository);
    });

    test('debería obtener todos los roles correctamente', async () => {
        // Arrange
        const mockRolPermisoses = [
            { id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true },
            { id: 2, rol_id: 1, acciones_pantalla_id: 2, crear: true, actualizar: false, eliminar: true, listar: true, ver: false },
            { id: 3, rol_id: 1, acciones_pantalla_id: 3, crear: true, actualizar: true, eliminar: false, listar: true, ver: true },
        ];
        mockRolPermisosRepository.getAll.mockResolvedValue(mockRolPermisoses);

        // Act
        const result = await getAllRolPermisosService.execute();

        // Assert
        expect(result).toEqual(mockRolPermisoses);
        expect(mockRolPermisosRepository.getAll).toHaveBeenCalled();
        expect(mockRolPermisosRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockRolPermisosRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllRolPermisosService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockRolPermisosRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 