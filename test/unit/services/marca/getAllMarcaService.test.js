// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllMarcaService from '../../../../src/services/marca/GetAllMarcaService.js';

describe('Unit Test: GetAllMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllMarcaService(mockRepository);
    });

    it('Obtiene todas las marcas exitosamente', async () => {
        // Arrange
        const mockResult = {data: [
            { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' },
            { id: 2, nombre: 'Adidas', logo: 'path/to/adidas.png' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockResult);
    });

    it('Obtiene todas las marcas incluyendo eliminadas', async () => {
        // Arrange
        const mockMarcas = {data: [
            { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' },
            { id: 2, nombre: 'Adidas', logo: 'path/to/adidas.png', deletedAt: '2023-01-01' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockMarcas);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockMarcas);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllMarcaService()).toThrow('El repositorio es requerido');
    });
    
}); 