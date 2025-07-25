import CreateRolService from '../../../../src/services/Rol/CreateRolService.js';

describe('CreateRolService', () => {
    const mockRolRepository = {
        create: jest.fn()
    };
    let createRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        createRolService = new CreateRolService(mockRolRepository);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateRolService()).toThrow('El repositorio es requerido');
    });

    test('debería crear un rol correctamente', async () => {
        const data = { nombre: 'ADMIN' };
        const mockRol = { id: 1, nombre: 'ADMIN' };
        mockRolRepository.create.mockResolvedValue(mockRol);

        const result = await createRolService.execute(data);

        expect(result).toEqual(mockRol);
        expect(mockRolRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '' };
        await expect(createRolService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockRolRepository.create).not.toHaveBeenCalled();
    });
}); 