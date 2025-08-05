// Mock del repositorio antes de importar el servicio
const mockRepository = {
    softDelete: jest.fn(),
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteMaterialesService from '../../../../src/services/materiales/SoftDeleteMaterialService.js';

describe('Unit Test: SoftDeleteMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteMaterialesService(mockRepository);
    });

    it('Elimina una materiales lógicamente exitosamente', async () => {
        // Arrange
        const mockMateriales = { id: 1, valor: 'Lana' };
        mockRepository.getById.mockResolvedValue(mockMateriales);
        mockRepository.softDelete.mockResolvedValue(mockMateriales);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual(mockMateriales);
    });

    it('Elimina una materiales con transacción', async () => {
        // Arrange
        const mockTransaction = { id: 'transaction-123' };
        const mockMateriales = { id: 1, valor: 'Cuero' };
        mockRepository.getById.mockResolvedValue(mockMateriales);
        mockRepository.softDelete.mockResolvedValue(mockMateriales);

        // Act
        const result = await service.execute(1, mockTransaction);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toEqual(mockMateriales);
    });

    it('Lanza error cuando la materiales no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Registro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
        expect(mockRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteMaterialesService()).toThrow('El repositorio es requerido');
    });
}); 