// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageMarcaService from '../../../../src/services/marca/GetPageMarcaService.js';

describe('Unit Test: GetPageMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetPageMarcaService(mockRepository);
    });

    it('Obtiene una página de marcas exitosamente', async () => {
        // Arrange
        const mockMarcas = [
            { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' },
            { id: 2, nombre: 'Adidas', logo: 'path/to/adidas.png' }
        ];
        const mockResponse = { rows: mockMarcas, count: 10 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 5);
        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 5, true);
        expect(result).toEqual({
            rows: mockMarcas,
            count: 10,
            totPag: 2
        });
    });

    it('Obtiene una página de marcas incluyendo eliminadas', async () => {
        // Arrange
        const mockMarcas = [
            { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' },
            { id: 2, nombre: 'Adidas', logo: 'path/to/adidas.png', deletedAt: '2023-01-01' }
        ];
        const mockResponse = { rows: mockMarcas, count: 15 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, 5, true);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true);
        expect(result).toEqual({
            rows: mockMarcas,
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
        expect(mockRepository.getPage).toHaveBeenCalledWith(20, 10, true);
    });

    it('Calcula correctamente totPag para diferentes cantidades', async () => {
        // Arrange
        const mockResponse = { rows: [], count: 25 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 10);

        // Assert
        expect(result.totPag).toBe(3); // 25 elementos / 10 por página = 3 páginas
    });

    it('Calcula totPag como 1 cuando count es menor que limit', async () => {
        // Arrange
        const mockResponse = { rows: [], count: 5 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 10);

        // Assert
        expect(result.totPag).toBe(1); // 5 elementos / 10 por página = 1 página
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetPageMarcaService()).toThrow('El repositorio es requerido');
    });
}); 