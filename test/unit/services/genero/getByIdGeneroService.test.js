// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdGeneroService from '../../../../src/services/genero/GetByIdGeneroService.js';

describe('Unit Test: GetByIdGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdGeneroService(mockRepository);
    });

    it('Obtiene un genero por ID exitosamente', async () => {
        // Arrange
        const mockGenero = { id: 1, genero: 'Masculino' };
        mockRepository.getById.mockResolvedValue(mockGenero);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockGenero);
    });

    it('Obtiene un genero por ID incluyendo eliminados', async () => {
        // Arrange
        const mockGenero = { id: 1, genero: 'Masculino', deletedAt: '2023-01-01' };
        mockRepository.getById.mockResolvedValue(mockGenero);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockGenero);
    });

    it('Lanza error cuando el genero no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Registro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdGeneroService()).toThrow('El repositorio es requerido');
    });
}); 