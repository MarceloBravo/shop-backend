
import GetPageSubCategoriaService from '../../../../src/services/subCategoria/GetPageSubCategoriaService.js';

describe('GetPageSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            getPage: jest.fn(),
        };
        service = new GetPageSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new GetPageSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should return a page of subcategories', async () => {
        const page = 1;
        const limit = 10;
        const subcategorias = { rows: [{ id: 1, nombre: 'Test1' }], count: 1 };
        repositoryMock.getPage.mockResolvedValue(subcategorias);

        const result = await service.execute(page, limit);

        expect(repositoryMock.getPage).toHaveBeenCalledWith(0, limit, [['nombre', 'ASC']], true);
        expect(result).toEqual({ ...subcategorias, totPag: 1 });
    });

    it('should return a page of subcategories including deleted ones when paranoid is false', async () => {
        const page = 1;
        const limit = 10;
        const subcategorias = { rows: [{ id: 1, nombre: 'Test1' }], count: 1 };
        repositoryMock.getPage.mockResolvedValue(subcategorias);

        const result = await service.execute(page, limit, false);

        expect(repositoryMock.getPage).toHaveBeenCalledWith(0, limit, [['nombre', 'ASC']], false);
        expect(result).toEqual({ ...subcategorias, totPag: 1 });
    });
});
