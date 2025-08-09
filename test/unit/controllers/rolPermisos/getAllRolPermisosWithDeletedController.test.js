// Mock del repositorio antes de importar el controlPermisosador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/RolPermisosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllRolPermisosWithDeletedController from '../../../../src/controllers/RolPermisos/GetAllRolPermisosWithDeletedController.js';

describe('Unit Test: GetAllRolPermisosWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllRolPermisosWithDeletedController(mockRepository);
    });

    it('Obtiene todos los rolPermisoses (incluyendo eliminados) exitosamente', async () => {
        // Arrange
        const mockData = { data: [{ id: 1, rolPermisos_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true }], count: 1 };
        mockRepository.getAll.mockResolvedValue(mockData);
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getAll).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(mockData);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockRepository.getAll.mockRejectedValue(error);

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