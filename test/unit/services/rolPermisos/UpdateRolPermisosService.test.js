import UpdateRolPermisosService from '../../../../src/services/RolPermisos/UpdateRolPermisosService.js';
import RolRepository from '../../../../src/repositories/RolRepository.js';
import PantallaRepository from '../../../../src/repositories/PantallaRepository.js';

jest.mock('../../../../src/repositories/RolRepository.js');
jest.mock('../../../../src/repositories/PantallaRepository.js');

describe('UpdateRolPermisosService', () => {
    const mockRolPermisosRepository = {
        update: jest.fn()
    };
    let updateRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        RolRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        });
        PantallaRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        });
        updateRolPermisosService = new UpdateRolPermisosService(mockRolPermisosRepository);
    });

    test('debería actualizar un rol correctamente', async () => {
        const data = { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const mockRolPermisos = { id: 1, ...data };
        mockRolPermisosRepository.update.mockResolvedValue(mockRolPermisos);

        const result = await updateRolPermisosService.execute(1, data);

        expect(result).toEqual(mockRolPermisos);
        expect(mockRolPermisosRepository.update).toHaveBeenCalledWith(1, data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { rol_id: null, acciones_pantalla_id: null, crear: null, actualizar: null, eliminar: null, listar: null, ver: null };
        await expect(updateRolPermisosService.execute(1, data)).rejects.toThrow('Datos no válidos:');
        expect(mockRolPermisosRepository.update).not.toHaveBeenCalled();
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new UpdateRolPermisosService()).toThrow('El repositorio es requerido');
    });
}); 