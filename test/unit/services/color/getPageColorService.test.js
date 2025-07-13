// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageColorService from '../../../../src/services/color/GetPageColorService.js';

describe('Unit Test: GetPageColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetPageColorService(mockRepository);
    });

    it('Obtiene una página de colores exitosamente', async () => {
        // Arrange
        const mockColors = [
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Azul', valor: '#0000FF' }
        ];
        const mockResponse = { rows: mockColors, count: 10 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 5);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 5, false);
        expect(result).toEqual({
            rows: mockColors,
            count: 10,
            totPag: 2
        });
    });

    it('Obtiene una página de colores incluyendo eliminados', async () => {
        // Arrange
        const mockColors = [
            { id: 1, nombre: 'Rojo', valor: '#FF0000' },
            { id: 2, nombre: 'Azul', valor: '#0000FF', deletedAt: '2023-01-01' }
        ];
        const mockResponse = { rows: mockColors, count: 15 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, 5, true);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true);
        expect(result).toEqual({
            rows: mockColors,
            count: 15,
            totPag: 3
        });
    });

    it('Calcula correctamente el offset para diferentes páginas', async () => {
        // Arrange
        const mockResponse = { rows: [], count: 0 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        await service.execute(3, 10);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(20, 10, false);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetPageColorService()).toThrow('El repositorio es requerido');
    });
}); 