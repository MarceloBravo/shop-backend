// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateMaterialesService from '../../../../src/services/materiales/UpdateMaterialService.js';

describe('Unit Test: UpdateMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateMaterialesService(mockRepository);
    });

    it('Actualiza una materiales exitosamente', async () => {
        // Arrange
        const materialesData = { valor: 'Lana' };
        const mockResponse = { id: 1, ...materialesData };
        mockRepository.update.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        // Act
        const result = await service.execute(1, materialesData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, materialesData, null);
        expect(result).toEqual(mockResponse);
    });
    
    it('Permite actualizar cuando la materiales con el mismo nombre es la misma', async () => {
        // Arrange
        const materialesData = { valor: 'Cuero' };
        const mockResponse = { id: 1, ...materialesData };
        mockRepository.update.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue({ id: 1, valor: 'Cuero' });

        // Act
        const result = await service.execute(1, materialesData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, materialesData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { valor: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateMaterialesService()).toThrow('El repositorio es requerido');
    });
}); 