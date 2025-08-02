// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getPage: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetPageGeneroService from '../../../../src/services/genero/GetPageGeneroService.js';

describe('Unit Test: GetPageGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetPageGeneroService(mockRepository);
    });

    it('Obtiene una página de generoes exitosamente', async () => {
        // Arrange
        const mockGeneros = [
            { id: 1, genero: 'Masculino' },
            { id: 2, genero: 'Femenino' }
        ];
        const mockResponse = { rows: mockGeneros, count: 10 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, 5);
        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 5, true);
        expect(result).toEqual({
            rows: mockGeneros,
            count: 10,
            totPag: 2
        });
    });

    it('Obtiene una página de generoes incluyendo eliminados', async () => {
        // Arrange
        const mockGeneros = [
            { id: 1, genero: 'Masculino' },
            { id: 2, genero: 'Femenino', deletedAt: '2023-01-01' }
        ];
        const mockResponse = { rows: mockGeneros, count: 15 };
        mockRepository.getPage.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, 5, true);

        // Assert
        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true);
        expect(result).toEqual({
            rows: mockGeneros,
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
        expect(() => new GetPageGeneroService()).toThrow('El repositorio es requerido');
    });
}); 