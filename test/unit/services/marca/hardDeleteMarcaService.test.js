// Mock del repositorio antes de importar el servicio
const mockRepository = {
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteMarcaService from '../../../../src/services/marca/HardDeleteMarcaService.js';

describe('Unit Test: HardDeleteMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new HardDeleteMarcaService(mockRepository);
    });

    it('Elimina una marca físicamente exitosamente', async () => {
        // Arrange
        const mockResult = { deleted: true };
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual(mockResult);
    });

    it('Elimina una marca con transacción', async () => {
        // Arrange
        const mockTransaction = { id: 'transaction-123' };
        const mockResult = { deleted: true };
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1, mockTransaction);

        // Assert
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toEqual(mockResult);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteMarcaService()).toThrow('El repositorio es requerido');
    });
}); 