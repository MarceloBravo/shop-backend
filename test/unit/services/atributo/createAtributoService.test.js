// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/AtributoProductoRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateAtributoService from '../../../../src/services/atributo/CreateAtributoService.js';

describe('Unit Test: CreateAtributoService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateAtributoService(mockRepository);
    });

    it('Crear un nuevo atributo', async () => {
        const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };
        const mockResponse = { id: 1, ...atributoData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(atributoData);

        expect(mockRepository.create).toHaveBeenCalledWith(atributoData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { nombre: '', valor_string: '', valor_numerico: 'abc' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateAtributoService()).toThrow('El repositorio es requerido');
    });
});
