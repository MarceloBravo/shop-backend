import GetPageRolService from '../../../../src/services/Rol/GetPageRolService.js';

describe('GetPageRolService', () => {
    const mockRolRepository = {
        getPage: jest.fn()
    };
    let getPageRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        getPageRolService = new GetPageRolService(mockRolRepository);
    });

    test('debería obtener una página de roles correctamente', async () => {
        const rows = [ { id: 1, nombre: 'ADMIN' }, { id: 2, nombre: 'USER' } ];
        const count = 2;
        mockRolRepository.getPage.mockResolvedValue({ rows, count });

        const result = await getPageRolService.execute(1, 2);

        expect(result).toEqual({ rows, count, totPag: 1 });
        expect(mockRolRepository.getPage).toHaveBeenCalledWith(0, 2, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetPageRolService()).toThrow('El repositorio es requerido');
    });
}); 