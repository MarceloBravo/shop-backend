// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageAtributoService from '../../../../src/services/atributo/GetPageAtributoService.js';

describe('Unit Test: GetPageAtributoService', () => {
    let service;
    const mockAtributos = [
            { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 },
            { nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null },
        ];

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetPageAtributoService(mockRepository);
    });

    it('Obtiene una página de atributoes exitosamente', async () => {
        // Arrange
        
        const mockResponse = { rows: mockAtributos, count: 10, totPag: 2 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 5);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 5, true);
        expect(result).toEqual({
            rows: mockAtributos,
            count: 10,
            totPag: 2
        });
    });

    it('Obtiene una página de atributoes incluyendo eliminados', async () => {
        // Arrange
        mockAtributos[1].deletedAt = '2023-01-01';
        const mockResponse = { rows: mockAtributos, count: 15, totPag: 3 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, 5, true);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true);
        expect(result).toEqual({
            rows: mockAtributos,
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
        expect(() => new GetPageAtributoService()).toThrow('El repositorio es requerido');
    });
}); 