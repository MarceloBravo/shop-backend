import CreateTallaNumeroService from '../../../../src/services/tallaNumero/CreateTallaNumeroService.js';

describe('CreateTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        create: jest.fn()
    };
    let createTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        createTallaNumeroService = new CreateTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateTallaNumeroService()).toThrow('El repositorio es requerido');
    });

    test('debería crear un tallaNumero correctamente', async () => {
        const data = { valor: 42.5 };
        const mockTallaNumero = { id: 1, valor: 42.5 };
        mockTallaNumeroRepository.create.mockResolvedValue(mockTallaNumero);

        const result = await createTallaNumeroService.execute(data);

        expect(result).toEqual(mockTallaNumero);
        expect(mockTallaNumeroRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { valor: null };
        await expect(createTallaNumeroService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockTallaNumeroRepository.create).not.toHaveBeenCalled();
    });
}); 