// Mock del repositorio antes de importar el servicio
const mockRepository = {
    hardDelete: jest.fn(),
    getById: jest.fn()
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
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' };
        const mockResult = { deleted: true };
        mockRepository.getById.mockResolvedValue(mockMarca);
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual(mockResult);
    });

    it('Elimina una marca con transacción', async () => {
        // Arrange
        const mockTransaction = { id: 'transaction-123' };
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' };
        const mockResult = { deleted: true };
        mockRepository.getById.mockResolvedValue(mockMarca);
        mockRepository.hardDelete.mockResolvedValue(mockResult);

        // Act
        const result = await service.execute(1, mockTransaction);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toEqual(mockResult);
    });

    it('Lanza error cuando la marca no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Regístro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, false);
        expect(mockRepository.hardDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteMarcaService()).toThrow('El repositorio es requerido');
    });
}); 