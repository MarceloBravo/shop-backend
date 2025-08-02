// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageCategoriaService from '../../../../src/services/Categoria/GetPageCategoriaService.js';

describe('Unit Test: GetPageCategoriaService', () => {
    let service;
    const mockCategorias = [
            {id: 1, nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' },
            {id: 2, nombre: 'Vestuario', descripcion: 'Vestuario hombre, mujer y niño'}
        ];


    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetPageCategoriaService(mockRepository);
    });

    it('Obtiene una página de categoriaes exitosamente', async () => {
        // Arrange
        const mockResponse = { rows: mockCategorias, count: 10 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 5);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 5, true);
        expect(result).toEqual({
            rows: mockCategorias,
            count: 10,
            totPag: 2
        });
    });

    it('Obtiene una página de categoriaes incluyendo eliminados', async () => {
        // Arrange
        mockCategorias[1].deletedAt = '2023-01-01';
        const mockResponse = { rows: mockCategorias, count: 15 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, 5, true);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true);
        expect(result).toEqual({
            rows: mockCategorias,
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

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetPageCategoriaService()).toThrow('El repositorio es requerido');
    });
}); 