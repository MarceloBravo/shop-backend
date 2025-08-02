// Mock del repositorio antes de importar el servicio
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateGeneroService from '../../../../src/services/genero/UpdateGeneroService.js';

describe('Unit Test: UpdateGeneroService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new UpdateGeneroService(mockRepository);
    });

    it('Actualiza un genero exitosamente', async () => {
        // Arrange
        const generoData = { genero: 'Masculino' };
        const mockResponse = { data: { id: 1, ...generoData }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(1, generoData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, generoData);
        expect(result).toEqual(mockResponse);
    });

    it('Crea un nuevo genero cuando no existe', async () => {
        // Arrange
        const generoData = { genero: 'Femenino' };
        const mockResponse = { data: { id: 2, ...generoData }, created: true };
        mockRepository.update.mockResolvedValue(mockResponse);

        // Act
        const result = await service.execute(2, generoData);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(2, generoData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        // Arrange
        const invalidData = { nombre: '', valor: '' };

        // Act & Assert
        await expect(service.execute(1, invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new UpdateGeneroService()).toThrow('El repositorio es requerido');
    });
}); 