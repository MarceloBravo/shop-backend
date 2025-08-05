// Mock del repositorio antes de importar el servicio
const mockRepository = {
    create: jest.fn(),
    getBy: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateMaterialesService from '../../../../src/services/materiales/CreateMaterialService.js';

describe('Unit Test: CreateMaterialesService', () => {
    let service;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        service = new CreateMaterialesService(mockRepository);
    });

    it('Crear una nueva materiales', async () => {
        const materialesData = { valor: 'Cuero' };
        const mockResponse = { id: 1, ...materialesData };

        // Configura el mock del repositorio
        mockRepository.create.mockResolvedValue(mockResponse);
        mockRepository.getBy.mockResolvedValue(false);

        const result = await service.execute(materialesData);

        expect(mockRepository.create).toHaveBeenCalledWith(materialesData, null);
        expect(result).toEqual(mockResponse);
    });

    it('Genera un error si la validación falla', async () => {
        const invalidData = { valor: '' };

        await expect(service.execute(invalidData)).rejects.toThrow('Datos no válidos:');
    });

    it('Lanza error si ya existe una materiales con ese nombre', async () => {
        const materialesData = { valor: 'Plastico' };
        mockRepository.getBy.mockResolvedValue({ id: 1, valor: 'Plastico' });

        await expect(service.execute(materialesData)).rejects.toThrow('Ya existe un material con ese valor');
    });

    it('Lanza error si no se proporciona un repositorio', () => {
        expect(() => new CreateMaterialesService()).toThrow('El repositorio es requerido');
    });
}); 