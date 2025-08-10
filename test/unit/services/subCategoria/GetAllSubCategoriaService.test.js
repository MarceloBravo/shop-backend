
import GetAllSubCategoriaService from '../../../../src/services/subCategoria/GetAllSubCategoriaService.js';

describe('GetAllSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            getAll: jest.fn(),
        };
        service = new GetAllSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new GetAllSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should return all subcategories', async () => {
        const subcategorias = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];
        repositoryMock.getAll.mockResolvedValue(subcategorias);

        const result = await service.execute();

        expect(repositoryMock.getAll).toHaveBeenCalledWith([['nombre', 'ASC']], true);
        expect(result).toEqual(subcategorias);
    });

    it('should return all subcategories including deleted ones when paranoid is false', async () => {
        const subcategorias = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2' }];
        repositoryMock.getAll.mockResolvedValue(subcategorias);

        const result = await service.execute(false);

        expect(repositoryMock.getAll).toHaveBeenCalledWith([['nombre', 'ASC']], false);
        expect(result).toEqual(subcategorias);
    });
});
