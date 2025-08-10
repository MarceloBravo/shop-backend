
import CreateSubCategoriaService from '../../../../src/services/subCategoria/CreateSubCategoriaService.js';
import validaDatos from '../../../../src/services/subCategoria/validaDatos.js';

jest.mock('../../../../src/services/subCategoria/validaDatos.js');

describe('CreateSubCategoriaService', () => {
    let repositoryMock;
    let service;

    beforeEach(() => {
        repositoryMock = {
            findBy: jest.fn(),
            create: jest.fn(),
        };
        service = new CreateSubCategoriaService(repositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if repository is not provided', () => {
        expect(() => new CreateSubCategoriaService()).toThrow('El repositorio es requerido');
    });

    it('should throw an error if validation fails', async () => {
        const data = { nombre: 'Test', categoria_id: 1 };
        const validationError = new Error('Datos no válidos');
        validationError.code = 400;
        validaDatos.mockRejectedValue(validationError);

        await expect(service.execute(data)).rejects.toThrow(validationError);
        expect(validaDatos).toHaveBeenCalledWith(data);
    });

    it('should throw an error if subcategory with the same name already exists', async () => {
        const data = { nombre: 'Test', categoria_id: 1 };
        validaDatos.mockResolvedValue();
        repositoryMock.findBy.mockResolvedValue({ id: 1, nombre: 'Test' });

        await expect(service.execute(data)).rejects.toThrow('Ya existe un registro con el nombre proporcionado');
        expect(repositoryMock.findBy).toHaveBeenCalledWith(data.nombre);
    });

    it('should create a new subcategory successfully', async () => {
        const data = { nombre: 'Test', categoria_id: 1 };
        const newSubCategoria = { id: 1, ...data };
        validaDatos.mockResolvedValue();
        repositoryMock.findBy.mockResolvedValue(null);
        repositoryMock.create.mockResolvedValue(newSubCategoria);

        const result = await service.execute(data);

        expect(validaDatos).toHaveBeenCalledWith(data);
        expect(repositoryMock.findBy).toHaveBeenCalledWith(data.nombre);
        expect(repositoryMock.create).toHaveBeenCalledWith(data, null);
        expect(result).toEqual(newSubCategoria);
    });
});
