import GetAllMenuService from '../../../../src/services/menu/GetAllMenuService.js';

describe('GetAllMenuService', () => {
    // Crear el mock del repositorio
    const mockMenuRepository = {
        getAll: jest.fn()
    };

    let getAllMenuService;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
        // Crear una instancia del servicio con el mock del repositorio
        getAllMenuService = new GetAllMenuService(mockMenuRepository);
    });

    test('debería obtener todos los menus correctamente', async () => {
        // Arrange
        const mockMenus = [
            { id: 1, nombre: 'ADMIN', icono: 'path/to/icono-admin.ico', menu_padre_id: 1, uri: '/admin', posicion: 10, pantalla_id: 1 },
            { id: 2, nombre: 'USER', icono: 'path/to/icono-user.ico', menu_padre_id: 1, uri: '/user', posicion: 20, pantalla_id: 2 }
        ];
        mockMenuRepository.getAll.mockResolvedValue(mockMenus);

        // Act
        const result = await getAllMenuService.execute();

        // Assert
        expect(result).toEqual(mockMenus);
        expect(mockMenuRepository.getAll).toHaveBeenCalled();
        expect(mockMenuRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        // Arrange
        const expectedError = new Error('Error de base de datos');
        mockMenuRepository.getAll.mockRejectedValue(expectedError);

        // Act & Assert
        await expect(getAllMenuService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockMenuRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllMenuService()).toThrow('El repositorio es requerido');
    });
}); 