// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdAtributoService from '../../../../src/services/atributo/GetByIdAtributoService.js';

describe('Unit Test: GetByIdAtributoService', () => {
    let service;
    const mockAtributo = { id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetByIdAtributoService(mockRepository);
    });

    it('Obtiene un atributo por ID exitosamente', async () => {
        // Arrange
        
        mockRepository.getById.mockResolvedValue(mockAtributo);

        // Act
        const result = await service.execute(1);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockAtributo);
    });

    it('Obtiene un atributo por ID incluyendo eliminados', async () => {
        // Arrange
        mockAtributo.deletedAt= '2023-01-01';
        mockRepository.getById.mockResolvedValue(mockAtributo);

        // Act
        const result = await service.execute(1, true);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockAtributo);
    });

    it('Lanza error cuando el atributo no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);

        // Act & Assert
        await expect(service.execute(999)).rejects.toThrow('Atributo no encontrado');
        expect(mockRepository.getById).toHaveBeenCalledWith(999, true);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetByIdAtributoService()).toThrow('El repositorio es requerido');
    });
}); 