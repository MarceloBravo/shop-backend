// Mock del repositorio antes de importar el controlPermisosador
const mockRepository = {
    getById: jest.fn(),
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/RolPermisosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteRolPermisosController from '../../../../src/controllers/RolPermisos/HardDeleteRolPermisosController.js';

describe('Unit Test: HardDeleteRolPermisosController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new HardDeleteRolPermisosController(mockRepository);
    });

    it('Elimina un rolPermisos exitosamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue({ id: 1, rolPermisos_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true });
        mockRepository.hardDelete.mockResolvedValue({ id: 1, result: 1 });
        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(res.json).toHaveBeenCalledWith({ id: 1, code: 200, mensaje: 'El registro ha sido eliminado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error cuando el rolPermisos no existe', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue(null);
        const req = { params: { id: 2 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            error: expect.any(String)
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue({ id: 1, rolPermisos_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true });
        mockRepository.hardDelete.mockRejectedValue(new Error('Error de base de datos'));
        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 500,
            details: [],
            error: expect.any(String)
        }));
    });
}); 