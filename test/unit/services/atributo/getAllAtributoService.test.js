// Mock del repositorio antes de importar el servicio
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/AtributoProductoRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllAtributoService from '../../../../src/services/atributo/GetAllAtributoService.js';

describe('Unit Test: GetAllAtributoService', () => {
    let service;
    const mockAtributos = [
            { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 },
            { nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null },
        ];

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new GetAllAtributoService(mockRepository);
    });

    it('Obtiene todos los atributoes exitosamente', async () => {
        // Arrange
        
        mockRepository.getAll.mockResolvedValue(mockAtributos);

        // Act
        const result = await service.execute();

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockAtributos);
    });

    it('Obtiene todos los atributoes incluyendo eliminados', async () => {
        // Arrange
        mockAtributos[1].deletedAt = '2023-01-01';
        mockRepository.getAll.mockResolvedValue(mockAtributos);

        // Act
        const result = await service.execute(false);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(mockAtributos);
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new GetAllAtributoService()).toThrow('El repositorio es requerido');
    });
    
}); 