// Mock del repositorio antes de importar el conttallaLetraador
const mockRepository = {
    getById: jest.fn(),
    hardDelete: jest.fn()
};

jest.mock('../../../../src/repositories/TallaLetraRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import HardDeleteTallaLetraController from '../../../../src/controllers/tallaLetra/HardDeleteTallaLetraController.js';

describe('Unit Test: HardDeleteTallaLetraController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new HardDeleteTallaLetraController(mockRepository);
    });

    it('Elimina una tallaLetra exitosamente de forma física', async () => {
        // Arrange
        mockRepository.getById.mockResolvedValue({ id: 1, valor: 'M' });
        mockRepository.hardDelete.mockResolvedValue({ id: 1, deleted_at: '2024-01-01' });
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

    it('Maneja error cuando el tallaLetra no existe', async () => {
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
        mockRepository.getById.mockResolvedValue({ id: 1, valor: 'M' });
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