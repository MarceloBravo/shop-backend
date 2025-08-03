// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdMarcaService from '../../../../src/services/marca/GetByIdMarcaService.js';

describe('Unit Test: GetByIdMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdMarcaService(mockRepository);
    });

    it('Obtiene una marca por ID exitosamente', async () => {
        // Arrange
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png' };
        mockRepository.getById.mockResolvedValue(mockMarca);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockMarca);
    });

    it('Obtiene una marca por ID incluyendo eliminadas', async () => {
        // Arrange
        const mockMarca = { id: 1, nombre: 'Nike', logo: 'path/to/nike.png', deletedAt: '2023-01-01' };
        mockRepository.getById.mockResolvedValue(mockMarca);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockMarca);
    });

    it('Lanza error 404 cuando la marca no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Marca no encontrada');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error con código 404 cuando la marca no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        try {
            await service.execute(999);
        } catch (error) {
            expect(error.code).toBe(404);
            expect(error.message).toBe('Marca no encontrada');
        }
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdMarcaService()).toThrow('El repositorio es requerido');
    });
}); 