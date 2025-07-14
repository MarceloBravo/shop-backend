// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdColorService from '../../../../src/services/color/GetByIdColorService.js';

describe('Unit Test: GetByIdColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdColorService(mockRepository);
    });

    it('Obtiene un color por ID exitosamente', async () => {
        // Arrange
        const mockColor = { id: 1, nombre: 'Rojo', valor: '#FF0000' };
        mockRepository.getById.mockResolvedValue(mockColor);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockColor);
    });

    it('Obtiene un color por ID incluyendo eliminados', async () => {
        // Arrange
        const mockColor = { id: 1, nombre: 'Rojo', valor: '#FF0000', deletedAt: '2023-01-01' };
        mockRepository.getById.mockResolvedValue(mockColor);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockColor);
    });

    it('Lanza error cuando el color no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Color no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdColorService()).toThrow('El repositorio es requerido');
    });
}); 