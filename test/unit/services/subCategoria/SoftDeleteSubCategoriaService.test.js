
import SoftDeleteSubCategoriaService from '../../../../src/services/subCategoria/SoftDeleteSubCategoriaService.js';

describe('SoftDeleteSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            getById: jest.fn(),
            softDelete: jest.fn(),
        };
        service = new SoftDeleteSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new SoftDeleteSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should throw an error if subcategory is not found', async () => {
        const id = 1;
        repositoryMock.getById.mockResolvedValue(null);

        await expect(service.execute(id)).rejects.toThrow('Subcategoría no encontrada');
        expect(repositoryMock.getById).toHaveBeenCalledWith(id);
    });

    it('should soft delete the subcategory successfully', async () => {
        const id = 1;
        const subcategoria = { id: 1, nombre: 'Test' };
        repositoryMock.getById.mockResolvedValue(subcategoria);
        repositoryMock.softDelete.mockResolvedValue(true);

        const result = await service.execute(id);

        expect(repositoryMock.getById).toHaveBeenCalledWith(id);
        expect(repositoryMock.softDelete).toHaveBeenCalledWith(id, null);
        expect(result).toBe(true);
    });
});
