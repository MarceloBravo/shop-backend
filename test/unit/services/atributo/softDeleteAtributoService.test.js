// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteAtributoService from '../../../../src/services/atributo/SoftDeleteAtributoService.js';

describe('Unit Test: SoftDeleteAtributoService', () => {
    let service;
    const mockAtributo = {id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new SoftDeleteAtributoService(mockRepository);
    });

    it('Elimina un atributo lógicamente exitosamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(mockAtributo);
        mockRepository.softDelete.mockResolvedValue(true);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
        expect(result).toBe(true);
    });

    it('Lanza error cuando el atributo no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Atributo no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999);
        expect(mockRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new SoftDeleteAtributoService()).toThrow('El repositorio es requerido');
    });
}); 