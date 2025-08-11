// Mock del repositorio antes de importar el conttallaLetraador
const mockRepository = {
    update: jest.fn()
};

jest.mock('../../../../src/repositories/TallaLetraRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateTallaLetraController from '../../../../src/controllers/tallaLetra/UpdateTallaLetraController.js';

describe('Unit Test: UpdateTallaLetraController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateTallaLetraController(mockRepository);
    });

    it('Actualiza un tallaLetra exitosamente', async () => {
        // Arrange
        const tallaLetraData = { valor: 'L' };
        const mockResponse = { data: { id: 1, valor: 'L' }, created: false };
        mockRepository.update.mockResolvedValue(mockResponse);
        const req = { params: { id: 1 }, body: tallaLetraData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, tallaLetraData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse.data,
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
            details: ["El campo valor es obligatorio y debe tener un máximo de hasta 5 caracteres."],
            error: "Error: Datos no válidos:"
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const tallaLetraData = { valor: 'L' };
        const req = { params: { id: 1 }, body: tallaLetraData };
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