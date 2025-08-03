// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getAll: jest.fn()
};

jest.mock('../../../../src/repositories/RolRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetAllRolWithDeletedController from '../../../../src/controllers/Rol/GetAllRolWithDeletedController.js';

describe('Unit Test: GetAllRolWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllRolWithDeletedController(mockRepository);
    });

    it('Obtiene todos los roles (incluyendo eliminados) exitosamente', async () => {
        // Arrange
        const mockData = { data: [{ id: 1, nombre: 'Admin' }], count: 1 };
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