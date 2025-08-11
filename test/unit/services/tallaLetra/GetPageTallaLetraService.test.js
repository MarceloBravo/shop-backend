import GetPageTallaLetraService from '../../../../src/services/tallaLetra/GetPageTallaLetraService.js';

describe('GetPageTallaLetraService', () => {
    const mockTallaLetraRepository = {
        getPage: jest.fn()
    };
    let getPageTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageTallaLetraService = new GetPageTallaLetraService(mockTallaLetraRepository);
    });

    test('debería obtener una página de tallaLetraes correctamente', async () => {
        const rows = [ { id: 1, valor: 'M' }, { id: 2, valor: 'L' } ];
        const count = 2;
        mockTallaLetraRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageTallaLetraService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 1 });
        expect(mockTallaLetraRepository.getPage).toHaveBeenCalledWith(0, 2, [["valor", "ASC"]], true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 