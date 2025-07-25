// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateColorService from '../../../../src/services/color/CreateColorService.js';

describe('Unit Test: CreateColorService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateColorService(mockRepository);
    });

    it('Crear un nuevo color', async () => {
        const colorData = { nombre: 'Rojo', valor: '#FF0000' };
        const mockResponse = { id: 1, ...colorData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(colorData);

        expect(mockRepository.create).toHaveBeenCalledWith(colorData);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { nombre: '', valor: '' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateColorService()).toThrow('El repositorio es requerido');
    });
});
