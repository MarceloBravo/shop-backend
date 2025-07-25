import GetPageAccionesPantallaService from '../../../../src/services/accionesPantalla/GetPageAccionesPantallaService.js';

describe('GetPageAccionesPantallaService', () => {
    const mockAccionesPantallaRepository = {
        getPage: jest.fn()
    };
    let getPageAccionesPantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageAccionesPantallaService = new GetPageAccionesPantallaService(mockAccionesPantallaRepository);
    });

    test('debería obtener una página de acciones de pantalla correctamente', async () => {
        const rows = [ { id: 1, nombre: 'VER' }, { id: 2, nombre: 'EDITAR' } ];
        const count = 2;
        mockAccionesPantallaRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageAccionesPantallaService.execute(1, 2);

        expect(result).toEqual({ rows, count });
        expect(mockAccionesPantallaRepository.getPage).toHaveBeenCalledWith(0, 2, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageAccionesPantallaService()).toThrow('El repositorio es requerido');
    });
}); 