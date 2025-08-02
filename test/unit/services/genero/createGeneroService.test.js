// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateGeneroService from '../../../../src/services/genero/CreateGeneroService.js';

describe('Unit Test: CreateGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateGeneroService(mockRepository);
    });

    it('Crear un nuevo genero', async () => {
        const generoData = { genero: 'Masculino' };
        const mockResponse = { id: 1, ...generoData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(generoData);

        expect(mockRepository.create).toHaveBeenCalledWith(generoData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { genero: '' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateGeneroService()).toThrow('El repositorio es requerido');
    });
});
