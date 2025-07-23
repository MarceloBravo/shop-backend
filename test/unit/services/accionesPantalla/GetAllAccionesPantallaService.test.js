import GetAllAccionesPantallaService from '../../../../src/services/accionesPantalla/GetAllAccionesPantallaService.js';

describe('GetAllAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        getAll: jest.fn()
    };
    let getAllAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        getAllAccionesPantallaService = new GetAllAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería obtener todas las acciones de pantalla correctamente', async () => {
        const mockAcciones = [
            { id: 1, nombre: 'VER' },
            { id: 2, nombre: 'EDITAR' }
        ];
        mockAccionesPantallaRepository.getAll.mockResolvedValue(mockAcciones);

        const result = await getAllAccionesPantallaService.execute();

        expect(result).toEqual(mockAcciones);
        expect(mockAccionesPantallaRepository.getAll).toHaveBeenCalled();
        expect(mockAccionesPantallaRepository.getAll).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error si el repositorio falla', async () => {
        const expectedError = new Error('Error de base de datos');
        mockAccionesPantallaRepository.getAll.mockRejectedValue(expectedError);

        await expect(getAllAccionesPantallaService.execute())
            .rejects
            .toThrow(expectedError);
        expect(mockAccionesPantallaRepository.getAll).toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetAllAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 