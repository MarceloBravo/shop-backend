
import GetByIdSubCategoriaService from '../../../../src/services/subCategoria/GetByIdSubCategoriaService.js';

describe('GetByIdSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            getById: jest.fn(),
        };
        service = new GetByIdSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new GetByIdSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should throw an error if subcategory is not found', async () => {
        const id = 1;
        repositoryMock.getById.mockResolvedValue(null);

        await expect(service.execute(id)).rejects.toThrow('Subcategoría no encontrada');
        expect(repositoryMock.getById).toHaveBeenCalledWith(id, true);
    });

    it('should return the subcategory when found', async () => {
        const id = 1;
        const subcategoria = { id: 1, nombre: 'Test' };
        repositoryMock.getById.mockResolvedValue(subcategoria);

        const result = await service.execute(id);

        expect(repositoryMock.getById).toHaveBeenCalledWith(id, true);
        expect(result).toEqual(subcategoria);
    });

    it('should return the subcategory when found, even if it is deleted, when paranoid is false', async () => {
        const id = 1;
        const subcategoria = { id: 1, nombre: 'Test', deletedAt: new Date() };
        repositoryMock.getById.mockResolvedValue(subcategoria);

        const result = await service.execute(id, false);

        expect(repositoryMock.getById).toHaveBeenCalledWith(id, false);
        expect(result).toEqual(subcategoria);
    });
});
