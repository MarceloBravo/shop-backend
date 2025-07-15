import UpdateRolService from '../../../../src/services/Rol/UpdateRolService.js';

describe('UpdateRolService', () => {
    const mockRolRepository = {
        update: jest.fn()
    };
    let updateRolService;

    beforeEach(() => {
        jest.clearAllMocks();
        updateRolService = new UpdateRolService(mockRolRepository);
    });

    test('debería actualizar un rol correctamente', async () => {
        const data = { nombre: 'ADMIN' };
        const mockRol = { id: 1, nombre: 'ADMIN' };
        mockRolRepository.update.mockResolvedValue(mockRol);

        const result = await updateRolService.execute(1, data);

        expect(result).toEqual(mockRol);
        expect(mockRolRepository.update).toHaveBeenCalledWith(1, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { nombre: '' };
        await expect(updateRolService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockRolRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateRolService()).toThrow('El repositorio es requerido');
    });
}); 