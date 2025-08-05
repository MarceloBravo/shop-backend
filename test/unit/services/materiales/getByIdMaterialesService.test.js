// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdMaterialesService from '../../../../src/services/materiales/GetByIdMaterialService.js';

describe('Unit Test: GetByIdMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdMaterialesService(mockRepository);
    });

    it('Obtiene una materiales por ID exitosamente', async () => {
        // Arrange
        const mockMateriales = { id: 1, valor: 'Lana' };
        mockRepository.getById.mockResolvedValue(mockMateriales);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockMateriales);
    });

    it('Obtiene una materiales por ID incluyendo eliminadas', async () => {
        // Arrange
        const mockMateriales = { id: 1, valor: 'Cuero', deletedAt: '2023-01-01' };
        mockRepository.getById.mockResolvedValue(mockMateriales);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockMateriales);
    });

    it('Lanza error 404 cuando la materiales no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Registro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error con código 404 cuando la materiales no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        try {
            await service.execute(999);
        } catch (error) {
            expect(error.code).toBe(404);
            expect(error.message).toBe('Registro no encontrado');
        }
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdMaterialesService()).toThrow('El repositorio es requerido');
    });
}); 