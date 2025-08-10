
import HardDeleteSubCategoriaService from '../../../../src/services/subCategoria/HardDeleteSubCategoriaService.js';

describe('HardDeleteSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            getById: jest.fn(),
            hardDelete: jest.fn(),
        };
        service = new HardDeleteSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new HardDeleteSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should throw an error if subcategory is not found', async () => {
        const id = 1;
        repositoryMock.getById.mockResolvedValue(null);

        await expect(service.execute(id)).rejects.toThrow('Subcategoría no encontrada');
        expect(repositoryMock.getById).toHaveBeenCalledWith(id, false);
    });

    it('should delete the subcategory successfully', async () => {
        const id = 1;
        const subcategoria = { id: 1, nombre: 'Test' };
        repositoryMock.getById.mockResolvedValue(subcategoria);
        repositoryMock.hardDelete.mockResolvedValue({ message: 'Subcategoría eliminada permanentemente' });

        const result = await service.execute(id);

        expect(repositoryMock.getById).toHaveBeenCalledWith(id, false);
        expect(repositoryMock.hardDelete).toHaveBeenCalledWith(id, null);
        expect(result).toEqual({ message: 'Subcategoría eliminada permanentemente' });
    });
});
