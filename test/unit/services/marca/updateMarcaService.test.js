// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateMarcaService from '../../../../src/services/marca/UpdateMarcaService.js';

describe('Unit Test: UpdateMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateMarcaService(mockRepository);
    });

    it('Actualiza una marca exitosamente', async () => {
        // Arrange
        const marcaData = { nombre: 'Nike', logo: 'path/to/nike.png' };
        const mockResponse = { id: 1, ...marcaData };
        mockRepository.update.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        // Act
        const result = await service.execute(1, marcaData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, marcaData, null);
        expect(result).toEqual(mockResponse);
    });
    
    it('Permite actualizar cuando la marca con el mismo nombre es la misma', async () => {
        // Arrange
        const marcaData = { nombre: 'Nike', logo: 'path/to/nike.png' };
        const mockResponse = { id: 1, ...marcaData };
        mockRepository.update.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue({ id: 1, nombre: 'Nike' });

        // Act
        const result = await service.execute(1, marcaData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, marcaData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { nombre: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateMarcaService()).toThrow('El repositorio es requerido');
    });
}); 