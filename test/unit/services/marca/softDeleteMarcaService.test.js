// Mock del repositorio antes de importar el servicio
const mockRepository = {
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteMarcaService from '../../../../src/services/marca/SoftDeleteMarcaService.js';

describe('Unit Test: SoftDeleteMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteMarcaService(mockRepository);
    });

    it('Elimina una marca lógicamente exitosamente', async () => {
        // Arrange
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' };
        mockRepository.softDelete.mockResolvedValue(mockMarca);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual(mockMarca);
    });

    it('Elimina una marca con transacción', async () => {
        // Arrange
        const mockTransaction = { id: 'transaction-123' };
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' };
        mockRepository.softDelete.mockResolvedValue(mockMarca);

        // Act
        const result = await service.execute(1, mockTransaction);

        // Assert
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toEqual(mockMarca);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteMarcaService()).toThrow('El repositorio es requerido');
    });
}); 