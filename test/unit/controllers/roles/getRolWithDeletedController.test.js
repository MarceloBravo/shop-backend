// Mock del repositorio antes de importar el controlador
const mockRepository = {
    getById: jest.fn()
};

jest.mock('../../../../src/repositories/RolRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import GetByIdRolWithDeletedController from '../../../../src/controllers/Rol/GetByIdRolWithDeletedController.js';

describe('Unit Test: GetByIdRolWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetByIdRolWithDeletedController(mockRepository);
    });

    it('Obtiene un rol por ID (incluyendo eliminados) exitosamente', async () => {
        // Arrange
        const mockData = { id: 1, nombre: 'Admin' };
        mockRepository.getById.mockResolvedValue(mockData);
        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(res.json).toHaveBeenCalledWith(mockData);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja error cuando el rol no existe', async () => {
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
        const req = { params: { id: 3 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockRepository.getById.mockRejectedValue(error);

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