// Mock del repositorio antes de importar el controlador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/RolRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateRolController from '../../../../src/controllers/Rol/UpdateRolController.js';

describe('Unit Test: UpdateRolController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateRolController(mockRepository);
    });

    it('Actualiza un rol exitosamente', async () => {
        // Arrange
        const rolData = { nombre: 'Editor' };
        const mockResponse = { data: { id: 1, nombre: 'Editor' }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);
        const req = { params: { id: 1 }, body: rolData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, rolData, null);
        expect(res.json).toHaveBeenCalledWith({
            rol: mockResponse.data,
            mensaje: 'Registro actualizado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { nombre: '' };
        const req = { params: { id: 1 }, body: invalidData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 400,
            details: ["Ingresa un nombre válido."],
            error: expect.any(String)
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const rolData = { nombre: 'Editor' };
        const req = { params: { id: 1 }, body: rolData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockRepository.update.mockRejectedValue(error);

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