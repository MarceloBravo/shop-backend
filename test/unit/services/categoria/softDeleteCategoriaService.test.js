// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteCategoriaService from '../../../../src/services/Categoria/SoftDeleteCategoriaService.js';

describe('Unit Test: SoftDeleteCategoriaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteCategoriaService(mockRepository);
    });

    it('Elimina un categoria lógicamente exitosamente', async () => {
        // Arrange
        const mockCategoria = {id: 1, nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' };
        mockRepository.getById.mockResolvedValue(mockCategoria);
        mockRepository.softDelete.mockResolvedValue(true);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it('Lanza error cuando el categoria no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Categoría no encontrada');
        expect(mockRepository.getById).toHaveBeenCalledWith(999);
        expect(mockRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteCategoriaService()).toThrow('El repositorio es requerido');
    });
}); 