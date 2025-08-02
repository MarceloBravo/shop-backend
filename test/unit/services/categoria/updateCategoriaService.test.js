// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/CategoriaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateCategoriaService from '../../../../src/services/Categoria/UpdateCategoriaService.js';

describe('Unit Test: UpdateCategoriaService', () => {
    let service;
    const categoriaData = { nombre: 'Electrónica', descripcion: 'Artículos electrónicos audio y video' };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateCategoriaService(mockRepository);
    });

    it('Actualiza un categoria exitosamente', async () => {
        // Arrange
        const mockResponse = { data: { id: 1, ...categoriaData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, categoriaData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, categoriaData);
        expect(result).toEqual(mockResponse);
    });

    it('Crea un nuevo categoria cuando no existe', async () => {
        // Arrange
        const mockResponse = { data: { id: 2, ...categoriaData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, categoriaData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(2, categoriaData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { nombre: '', valor: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateCategoriaService()).toThrow('El repositorio es requerido');
    });
}); 