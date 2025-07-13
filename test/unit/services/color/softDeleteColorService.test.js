// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteColorService from '../../../../src/services/color/SoftDeleteColorService.js';

describe('Unit Test: SoftDeleteColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteColorService(mockRepository);
    });

    it('Elimina un color lógicamente exitosamente', async () => {
        // Arrange
        const mockColor = { id: 1, nombre: 'Rojo', valor: '#FF0000' };
        mockRepository.getById.mockResolvedValue(mockColor);
        mockRepository.softDelete.mockResolvedValue(true);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it('Lanza error cuando el color no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Color no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999);
        expect(mockRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteColorService()).toThrow('El repositorio es requerido');
    });
}); 