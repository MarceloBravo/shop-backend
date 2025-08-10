
import validaDatos from '../../../../src/services/subCategoria/validaDatos.js';
import CategoriaRepository from '../../../../src/repositories/CategoriaRepository.js';

jest.mock('../../../../src/repositories/CategoriaRepository.js');

describe('validaDatos', () => {
    let categoriaRepositoryMock;

    beforeEach(() => {
        categoriaRepositoryMock = {
            getById: jest.fn(),
        };
        CategoriaRepository.mockImplementation(() => categoriaRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if nombre is invalid', async () => {
        const data = { nombre: '', categoria_id: 1 };
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos');
    });

    it('should throw an error if categoria_id is invalid', async () => {
        const data = { nombre: 'Test', categoria_id: 1 };
        categoriaRepositoryMock.getById.mockResolvedValue(null);
        await expect(validaDatos(data)).rejects.toThrow('Datos no válidos');
    });

    it('should not throw an error if data is valid', async () => {
        const data = { nombre: 'Test', categoria_id: 1 };
        categoriaRepositoryMock.getById.mockResolvedValue({ id: 1 });
        await expect(validaDatos(data)).resolves.not.toThrow();
    });
});
