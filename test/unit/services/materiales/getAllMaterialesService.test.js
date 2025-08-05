// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllMaterialesService from '../../../../src/services/materiales/GetAllMaterialService.js';

describe('Unit Test: GetAllMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllMaterialesService(mockRepository);
    });

    it('Obtiene todas las materialess exitosamente', async () => {
        // Arrange
        const mockResult = {data: [
            { id: 1, valor: 'Lana' },
            { id: 2, valor: 'Cuero' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockResult);
    });

    it('Obtiene todas las materialess incluyendo eliminadas', async () => {
        // Arrange
        const mockMaterialess = {data: [
            { id: 1, valor: 'Lana' },
            { id: 2, valor: 'Cuero', deletedAt: '2023-01-01' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockMaterialess);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockMaterialess);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllMaterialesService()).toThrow('El repositorio es requerido');
    });
    
}); 