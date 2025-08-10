import CreateRolPermisosService from '../../../../src/services/RolPermisos/CreateRolPermisosService.js';
import RolRepository from '../../../../src/repositories/RolRepository.js';
import AccionesPantallaRepository from '../../../../src/repositories/AccionesPantallaRepository.js';

jest.mock('../../../../src/repositories/RolRepository.js');
jest.mock('../../../../src/repositories/AccionesPantallaRepository.js');

describe('CreateRolPermisosService', () => {
    //jest.mock('../../../../src/services/accionesPantalla/validaDatos.js');
    const mockRolPermisosRepository = {
        create: jest.fn(),
        getBy: jest.fn()
    };
    let createRolPermisosService;

    beforeEach(() => {
        jest.clearAllMocks();
        RolRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        });
        AccionesPantallaRepository.mockImplementation(() => {
            return {
                getById: jest.fn().mockResolvedValue({ id: 1 })
            };
        });
        createRolPermisosService = new CreateRolPermisosService(mockRolPermisosRepository);
    });

    test('debería lanzar un error si no es recibido un repositorio en el constructor', () => {
        expect(() => new CreateRolPermisosService()).toThrow('El repositorio es requerido');
    });

    test('debería crear un rol correctamente', async () => {
        const data = { rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };
        const mockRolPermisos = { id: 1, ...data };
        
        mockRolPermisosRepository.getBy.mockResolvedValue(null);
        mockRolPermisosRepository.create.mockResolvedValue(mockRolPermisos);

        const result = await createRolPermisosService.execute(data);

        expect(result).toEqual(mockRolPermisos);
        expect(mockRolPermisosRepository.create).toHaveBeenCalledWith(data, null);
    });

    test('debería lanzar error si los datos no son válidos', async () => {
        const data = { rol_id: null, acciones_pantalla_id: null, crear: null, actualizar: null, eliminar: null, listar: null, ver: null };
        await expect(createRolPermisosService.execute(data)).rejects.toThrow('Datos no válidos:');
        expect(mockRolPermisosRepository.create).not.toHaveBeenCalled();
    });
}); 