// Mock del repositorio antes de importar el controlPermisosador
const mockRepository = {
    getById: jest.fn(),
    softDelete: jest.fn()
};

jest.mock('../../../../src/repositories/RolPermisosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import SoftDeleteRolPermisosController from '../../../../src/controllers/RolPermisos/SoftDeleteRolPermisosController.js';

describe('Unit Test: SoftDeleteRolPermisosController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new SoftDeleteRolPermisosController(mockRepository);
    });

    it('Borra lógicamente un rolPermisos exitosamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue({ id: 1, rolPermisos_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true });
        mockRepository.softDelete.mockResolvedValue({ id: 1, deleted_at: '2024-01-01' });
        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
        expect(res.json).toHaveBeenCalledWith({ code: 200, mensaje: 'El registro ha sido borrado exitosamente.' });
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
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 404,
            error: expect.any(String)
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue({ id: 1, rolPermisos_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true });
        mockRepository.softDelete.mockRejectedValue(new Error('Error de base de datos'));
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