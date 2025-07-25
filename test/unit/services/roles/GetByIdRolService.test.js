import GetByIdRolService from '../../../../src/services/Rol/GetByIdRolService.js';

describe('GetByIdRolService', () => {
    const mockRolRepository = {
        getById: jest.fn()
    };
    let getByIdRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        getByIdRolService = new GetByIdRolService(mockRolRepository);
    });

    test('debería obtener un rol por ID correctamente', async () => {
        const mockRol = { id: 1, nombre: 'ADMIN' };
        mockRolRepository.getById.mockResolvedValue(mockRol);

        const result = await getByIdRolService.execute(1);

        expect(result).toEqual(mockRol);
        expect(mockRolRepository.getById).toHaveBeenCalledWith(1, true);
    });

    test('debería lanzar error si el rol no existe', async () => {
        mockRolRepository.getById.mockResolvedValue(null);
        await expect(getByIdRolService.execute(99)).rejects.toThrow('Rol no encontrado');
        expect(mockRolRepository.getById).toHaveBeenCalledWith(99, true);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new GetByIdRolService()).toThrow('El repositorio es requerido');
    });
}); 