// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateMarcaService from '../../../../src/services/marca/CreateMarcaService.js';

describe('Unit Test: CreateMarcaService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateMarcaService(mockRepository);
    });

    it('Crear una nueva marca', async () => {
        const marcaData = { nombre: 'Nike', logo: 'path/to/logo.png' };
        const mockResponse = { id: 1, ...marcaData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(marcaData);

        expect(mockRepository.create).toHaveBeenCalledWith(marcaData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { nombre: '' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si ya existe una marca con ese nombre', async () => {
        const marcaData = { nombre: 'Nike', logo: 'path/to/logo.png' };
        mockRepository.getBy.mockResolvedValue({ id: 1, nombre: 'Nike' });

        await expect(service.execute(marcaData)).rejects.toThrow('Ya existe una marca con ese nombre');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateMarcaService()).toThrow('El repositorio es requerido');
    });
}); 