// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateCategoriaService from '../../../../src/services/Categoria/CreateCategoriaService.js';

describe('Unit Test: CreateCategoriaService', () => {
    let service;
    const categoriaData = { nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateCategoriaService(mockRepository);
    });

    it('Crear un nuevo categoria', async () => {        
        const mockResponse = { id: 1, ...categoriaData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(categoriaData);

        expect(mockRepository.create).toHaveBeenCalledWith(categoriaData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { nombre: '', descripcion: '' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateCategoriaService()).toThrow('El repositorio es requerido');
    });
});
