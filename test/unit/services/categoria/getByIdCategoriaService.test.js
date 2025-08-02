// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdCategoriaService from '../../../../src/services/Categoria/GetByIdCategoriaService.js';

describe('Unit Test: GetByIdCategoriaService', () => {
    let service;
    const mockCategoria = { nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdCategoriaService(mockRepository);
    });

    it('Obtiene un categoria por ID exitosamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(mockCategoria);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockCategoria);
    });

    it('Obtiene un categoria por ID incluyendo eliminados', async () => {
        // Arrange
        mockCategoria.deletedAt ='2023-01-01';
        mockRepository.getById.mockResolvedValue(mockCategoria);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockCategoria);
    });

    it('Lanza error cuando el categoria no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Categoría no encontrada');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdCategoriaService()).toThrow('El repositorio es requerido');
    });
}); 