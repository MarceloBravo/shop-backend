import CreateTallaLetraService from '../../../../src/services/tallaLetra/CreateTallaLetraService.js';

describe('CreateTallaLetraService', () => {
    const mockTallaLetraRepository = {
        create: jest.fn()
    };
    let createTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        createTallaLetraService = new CreateTallaLetraService(mockTallaLetraRepository);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateTallaLetraService()).toThrow('El repositorio es requerido');
    });

    test('debería crear un tallaLetra correctamente', async () => {
        const data = { valor: 'M' };
        const mockTallaLetra = { id: 1, valor: 'M' };
        mockTallaLetraRepository.create.mockResolvedValue(mockTallaLetra);

        const result = await createTallaLetraService.execute(data);

        expect(result).toEqual(mockTallaLetra);
        expect(mockTallaLetraRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { valor: '' };
        await expect(createTallaLetraService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockTallaLetraRepository.create).not.toHaveBeenCalled();
    });
}); 