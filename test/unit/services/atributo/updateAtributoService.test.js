// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateAtributoService from '../../../../src/services/atributo/UpdateAtributoService.js';

describe('Unit Test: UpdateAtributoService', () => {
    let service;
    const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateAtributoService(mockRepository);
    });

    it('Actualiza un atributo exitosamente', async () => {
        // Arrange
        const mockResponse = { data: { id: 1, ...atributoData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, atributoData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, atributoData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Crea un nuevo atributo cuando no existe', async () => {
        // Arrange
        const mockResponse = { data: { id: 2, ...atributoData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, atributoData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(2, atributoData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { nombre: '', valor: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateAtributoService()).toThrow('El repositorio es requerido');
    });
}); 