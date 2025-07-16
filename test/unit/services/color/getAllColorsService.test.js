// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllColorService from '../../../../src/services/color/GetAllColorsService.js';

describe('Unit Test: GetAllColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllColorService(mockRepository);
    });

    it('Obtiene todos los colores exitosamente', async () => {
        // Arrange
        const mockColors = [
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Azul', valor: '#0000FF' }
        ];
        mockRepository.getAll.mockResolvedValue(mockColors);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockColors);
    });

    it('Obtiene todos los colores incluyendo eliminados', async () => {
        // Arrange
        const mockColors = [
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Azul', valor: '#0000FF', deletedAt: '2023-01-01' }
        ];
        mockRepository.getAll.mockResolvedValue(mockColors);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockColors);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllColorService()).toThrow('Repository is required');
    });
    
}); 