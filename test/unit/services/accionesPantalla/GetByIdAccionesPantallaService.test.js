import GetByIdAccionesPantallaService from '../../../../src/services/accionesPantalla/GetByIdAccionesPantallaService.js';

describe('GetByIdAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        getById: jest.fn()
    };
    let getByIdAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdAccionesPantallaService = new GetByIdAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería obtener una acción de pantalla por ID correctamente', async () => {
        const mockAccion = { id: 1, nombre: 'VER' };
        mockAccionesPantallaRepository.getById.mockResolvedValue(mockAccion);

        const result = await getByIdAccionesPantallaService.execute(1);

        expect(result).toEqual(mockAccion);
        expect(mockAccionesPantallaRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el regístro no existe', async () => {
        mockAccionesPantallaRepository.getById.mockResolvedValue(null);
        await expect(getByIdAccionesPantallaService.execute(99)).rejects.toThrow('Registro no encontrado');
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 