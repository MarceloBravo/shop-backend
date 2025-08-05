// Mock del repositorio antes de importar el servicio
const mockRepository = {
    hardDelete: jest.fn(),
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteMaterialesService from '../../../../src/services/materiales/HardDeleteMaterialService.js';

describe('Unit Test: HardDeleteMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new HardDeleteMaterialesService(mockRepository);
    });

    it('Elimina una materiales físicamente exitosamente', async () => {
        // Arrange
        const mockMateriales = { id: 1, valor: 'Cuero' };
        const mockResult = { deleted: true };
        mockRepository.getById.mockResolvedValue(mockMateriales);
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual(mockResult);
    });

    it('Elimina una materiales con transacción', async () => {
        // Arrange
        const mockTransaction = { id: 'transaction-123' };
        const mockMateriales = { id: 1, valor: 'Cuero' };
        const mockResult = { deleted: true };
        mockRepository.getById.mockResolvedValue(mockMateriales);
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1, mockTransaction);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toEqual(mockResult);
    });

    it('Lanza error cuando la materiales no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Registro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, false);
        expect(mockRepository.hardDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteMaterialesService()).toThrow('El repositorio es requerido');
    });
}); 