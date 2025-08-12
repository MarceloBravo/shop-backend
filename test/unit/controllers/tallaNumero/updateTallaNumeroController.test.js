// Mock del repositorio antes de importar el conttallaNumeroador
const mockRepository = {
    update: jest.fn(),
    getBy: jest.fn(),
};

jest.mock('../../../../src/repositories/TallaNumeroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import UpdateTallaNumeroController from '../../../../src/controllers/tallaNumero/UpdateTallaNumeroController.js';

describe('Unit Test: UpdateTallaNumeroController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateTallaNumeroController(mockRepository);
    });

    it('Actualiza un tallaNumero exitosamente', async () => {
        // Arrange
        const tallaNumeroData = { valor: 39.5 };
        const mockResponse = { data: { id: 1, valor: 39.5 }, created: false };
        mockRepository.getBy.mockResolvedValue({ id: 1, valor: 39 });
        mockRepository.update.mockResolvedValue(mockResponse);
        const req = { params: { id: 1 }, body: tallaNumeroData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);
        
        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith(1, tallaNumeroData, null);
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
            details: ["El campo valor es obligatorio."],
            error: "Error: Datos no válidos:"
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const tallaNumeroData = { valor: 39.5 };
        const req = { params: { id: 1 }, body: tallaNumeroData };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Talla numérica ya existe');
        error.code = 409;
        mockRepository.update.mockRejectedValue(error);

        // Act
        await controller.execute(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            code: 409,
            details: [],
            error: "Error: Talla numérica ya existe"
        });
    });
}); 