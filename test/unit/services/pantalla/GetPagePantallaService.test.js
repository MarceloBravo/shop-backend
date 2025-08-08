import GetPagePantallaService from '../../../../src/services/pantalla/GetPagePantallaService.js';

describe('GetPagePantallaService', () => {
    const mockPantallaRepository = {
        getPage: jest.fn()
    };
    let getPagePantallaService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPagePantallaService = new GetPagePantallaService(mockPantallaRepository);
    });

    test('debería obtener una página de pantallas correctamente', async () => {
        const rows = [ 
            { id: 1, nombre: 'ADMIN', uri: 'admin' },
            { id: 2, nombre: 'USER', icono: 'usuarios' }
         ];
        const count = 2;
        mockPantallaRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPagePantallaService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 1 });
        expect(mockPantallaRepository.getPage).toHaveBeenCalledWith(0, 2, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPagePantallaService()).toThrow('El repositorio es requerido');
    });
}); 