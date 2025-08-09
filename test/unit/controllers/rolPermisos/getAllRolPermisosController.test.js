// Mock del repositorio antes de importar el controlPermisosador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/RolPermisosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllRolPermisosController from '../../../../src/controllers/RolPermisos/GetAllRolPermisosController.js';

describe('Unit Test: GetAllRolPermisosController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllRolPermisosController(mockRepository);
    });

    it('Obtiene todos los rolPermisoses exitosamente', async () => {
        // Arrange
        const mockData = { data: [{ id: 1, rol_id: 1, acciones_pantalla_id: 1, crear: true, actualizar: true, eliminar: true, listar: true, ver: true }], count: 1 };
        mockRepository.getAll.mockResolvedValue(mockData);
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);
        // Assert
        expect(mockRepository.getAll).toHaveBeenCalled();
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