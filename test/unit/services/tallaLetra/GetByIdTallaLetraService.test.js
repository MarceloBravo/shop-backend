import GetByIdTallaLetraService from '../../../../src/services/tallaLetra/GetByIdTallaLetraService.js';

describe('GetByIdTallaLetraService', () => {
    const mockTallaLetraRepository = {
        getById: jest.fn()
    };
    let getByIdTallaLetraService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdTallaLetraService = new GetByIdTallaLetraService(mockTallaLetraRepository);
    });

    test('debería obtener un tallaLetra por ID correctamente', async () => {
        const mockTallaLetra = { id: 1, valor: 'M' };
        mockTallaLetraRepository.getById.mockResolvedValue(mockTallaLetra);

        const result = await getByIdTallaLetraService.execute(1);

        expect(result).toEqual(mockTallaLetra);
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el tallaLetra no existe', async () => {
        mockTallaLetraRepository.getById.mockResolvedValue(null);
        await expect(getByIdTallaLetraService.execute(99)).rejects.toThrow('Registro no encontrado');
        expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdTallaLetraService()).toThrow('El repositorio es requerido');
    });
}); 