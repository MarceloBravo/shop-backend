// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteGeneroService from '../../../../src/services/genero/SoftDeleteGeneroService.js';

describe('Unit Test: SoftDeleteGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteGeneroService(mockRepository);
    });

    it('Elimina un genero lógicamente exitosamente', async () => {
        // Arrange
        const mockGenero = { id: 1, genero: 'Masculino' };
        mockRepository.getById.mockResolvedValue(mockGenero);
        mockRepository.softDelete.mockResolvedValue(true);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it('Lanza error cuando el genero no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Género no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999);
        expect(mockRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteGeneroService()).toThrow('El repositorio es requerido');
    });
}); 