// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteColorService from '../../../../src/services/color/HardDeleteColorService.js';

describe('Unit Test: HardDeleteColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new HardDeleteColorService(mockRepository);
    });

    it('Elimina un color físicamente exitosamente', async () => {
        // Arrange
        const mockColor = { id: 1, nombre: 'Rojo', valor: '#FF0000' };
        mockRepository.getById.mockResolvedValue(mockColor);
        mockRepository.hardDelete.mockResolvedValue({ deleted: true });

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1);
        expect(result).toEqual({ deleted: true });
    });

    it('Lanza error cuando el color no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Color no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, false);
        expect(mockRepository.hardDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteColorService()).toThrow('El repositorio es requerido');
    });
}); 