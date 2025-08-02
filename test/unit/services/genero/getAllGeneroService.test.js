// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllGeneroService from '../../../../src/services/genero/GetAllGeneroService.js';

describe('Unit Test: GetAllGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllGeneroService(mockRepository);
    });

    it('Obtiene todos los generoes exitosamente', async () => {
        // Arrange
        const mockResult = {data: [
            { id: 1, genero: 'Masculino' },
            { id: 2, genero: 'Femenino' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockResult);
    });

    it('Obtiene todos los generoes incluyendo eliminados', async () => {
        // Arrange
        const mockGeneros = {data: [
            { id: 1, genero: 'Masculino' },
            { id: 2, genero: 'Femenino', deletedAt: '2023-01-01' }
        ], count: 2};
        mockRepository.getAll.mockResolvedValue(mockGeneros);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockGeneros);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllGeneroService()).toThrow('El repositorio es requerido');
    });
    
}); 