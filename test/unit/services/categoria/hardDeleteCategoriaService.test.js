// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteCategoriaService from '../../../../src/services/Categoria/HardDeleteCategoriaService.js';

describe('Unit Test: HardDeleteCategoriaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new HardDeleteCategoriaService(mockRepository);
    });

    it('Elimina un categoria físicamente exitosamente', async () => {
        // Arrange
        const mockCategoria = {id: 1, nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' };
        mockRepository.getById.mockResolvedValue(mockCategoria);
        mockRepository.hardDelete.mockResolvedValue({ deleted: true });

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1);
        expect(result).toEqual({ deleted: true });
    });

    it('Lanza error cuando el categoria no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Categoría no encontrada');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, false);
        expect(mockRepository.hardDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteCategoriaService()).toThrow('El repositorio es requerido');
    });
}); 