// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn(),
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteAtributoService from '../../../../src/services/atributo/HardDeleteAtributoService.js';

describe('Unit Test: HardDeleteAtributoService', () => {
    let service;
    const mockAtributo = {id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new HardDeleteAtributoService(mockRepository);
    });

    it('Elimina un atributo físicamente exitosamente', async () => {
        // Arrange        
        mockRepository.getById.mockResolvedValue(mockAtributo);
        mockRepository.hardDelete.mockResolvedValue({ deleted: true });

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual({ deleted: true });
    });

    it('Lanza error cuando el atributo no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Registro no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, false);
        expect(mockRepository.hardDelete).not.toHaveBeenCalled();
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new HardDeleteAtributoService()).toThrow('El repositorio es requerido');
    });
}); 