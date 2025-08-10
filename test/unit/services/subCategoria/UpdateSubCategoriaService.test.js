
import UpdateSubCategoriaService from '../../../../src/services/subCategoria/UpdateSubCategoriaService.js';
import validaDatos from '../../../../src/services/subCategoria/validaDatos.js';

jest.mock('../../../../src/services/subCategoria/validaDatos.js');

describe('UpdateSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            update: jest.fn(),
        };
        service = new UpdateSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new UpdateSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should throw an error if validation fails', async () => {
        const id = 1;
        const data = { nombre: 'Test', categoria_id: 1 };
        const validationError = new Error('Datos no válidos');
        validationError.code = 400;
        validaDatos.mockRejectedValue(validationError);

        await expect(service.execute(id, data)).rejects.toThrow(validationError);
        expect(validaDatos).toHaveBeenCalledWith(data);
    });

    it('should update the subcategory successfully', async () => {
        const id = 1;
        const data = { nombre: 'Test', categoria_id: 1 };
        const updatedSubCategoria = { id: 1, ...data };
        validaDatos.mockResolvedValue();
        repositoryMock.update.mockResolvedValue(updatedSubCategoria);

        const result = await service.execute(id, data);

        expect(validaDatos).toHaveBeenCalledWith(data);
        expect(repositoryMock.update).toHaveBeenCalledWith(id, data, null);
        expect(result).toEqual(updatedSubCategoria);
    });
});
