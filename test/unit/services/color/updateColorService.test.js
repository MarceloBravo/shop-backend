// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateColorService from '../../../../src/services/color/UpdateColorService.js';

describe('Unit Test: UpdateColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateColorService(mockRepository);
    });

    it('Actualiza un color exitosamente', async () => {
        // Arrange
        const colorData = { nombre: 'Rojo', valor: '#FF0000' };
        const mockResponse = { data: { id: 1, ...colorData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, colorData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, colorData);
        expect(result).toEqual(mockResponse);
    });

    it('Crea un nuevo color cuando no existe', async () => {
        // Arrange
        const colorData = { nombre: 'Azul', valor: '#0000FF' };
        const mockResponse = { data: { id: 2, ...colorData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, colorData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(2, colorData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { nombre: '', valor: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateColorService()).toThrow('El repositorio es requerido');
    });
}); 