import UpdateTallaNumeroService from '../../../../src/services/tallaNumero/UpdateTallaNumeroService.js';

describe('UpdateTallaNumeroService', () => {
    const mockTallaNumeroRepository = {
        update: jest.fn(),
        getBy: jest.fn(),
    };
    let updateTallaNumeroService;

    beforeEach(() => {
        jest.clearAllMocks();
        updateTallaNumeroService = new UpdateTallaNumeroService(mockTallaNumeroRepository);
    });

    test('debería actualizar un tallaNumero correctamente', async () => {
        const data = { valor: 42.5 };
        const mockTallaNumero = { id: 1, valor: 42.5 };
        mockTallaNumeroRepository.getBy.mockResolvedValue(null);
        mockTallaNumeroRepository.update.mockResolvedValue(mockTallaNumero);

        const result = await updateTallaNumeroService.execute(1, data);

        expect(result).toEqual(mockTallaNumero);
        expect(mockTallaNumeroRepository.update).toHaveBeenCalledWith(1, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { valor: null };
        await expect(updateTallaNumeroService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockTallaNumeroRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateTallaNumeroService()).toThrow('El repositorio es requerido');
    });
}); 