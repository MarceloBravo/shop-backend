import GetByIdTallaNumeroService from '../../../../src/services/tallaNumero/GetByIdTallaNumeroService.js';

describe('GetByIdTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        getById: jest.fn()
    };
    let getByIdTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdTallaNumeroService = new GetByIdTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería obtener un tallaNumero por ID correctamente', async () => {
        const mockTallaNumero = { id: 1, valor: 42.5 };
        mockTallaNumeroRepository.getById.mockResolvedValue(mockTallaNumero);

        const result = await getByIdTallaNumeroService.execute(1);

        expect(result).toEqual(mockTallaNumero);
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el tallaNumero no existe', async () => {
        mockTallaNumeroRepository.getById.mockResolvedValue(null);
        await expect(getByIdTallaNumeroService.execute(99)).rejects.toThrow('Registro no encontrado');
        expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 