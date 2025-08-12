import GetPageTallaNumeroService from '../../../../src/services/tallaNumero/GetPageTallaNumeroService.js';

describe('GetPageTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        getPage: jest.fn()
    };
    let getPageTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageTallaNumeroService = new GetPageTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería obtener una página de tallaNumeroes correctamente', async () => {
        const rows = [ { id: 1, valor: 42.5 }, { id: 2, valor: 39 } ];
        const count = 2;
        mockTallaNumeroRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageTallaNumeroService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 1 });
        expect(mockTallaNumeroRepository.getPage).toHaveBeenCalledWith(0, 2, [["valor", "ASC"]], true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 