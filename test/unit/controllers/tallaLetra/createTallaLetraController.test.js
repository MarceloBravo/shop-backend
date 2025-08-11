// Mock del repositorio antes de importar el conttallaLetraador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/TallaLetraRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateTallaLetraController from '../../../../src/controllers/tallaLetra/CreateTallaLetraController.js';


describe('Unit Test: CreateTallaLetraController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new CreateTallaLetraController(mockRepository);
    });

    it('Crea un tallaLetra exitosamente', async () => {
        // Arrange
        const tallaLetraData = { valor: 'S' };
        const mockResponse = { id: 1, ...tallaLetraData };
        mockRepository.create.mockResolvedValue(mockResponse);

        const req = {
            body: { valor: 'S' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ valor: 'S' }, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { nombre: '' };
        const req = {
            body: invalidData
        };
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
        const tallaLetraData = { valor: 'S' };
        const req = {
            body: tallaLetraData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const error = new Error('Error de base de datos');
        mockRepository.create.mockRejectedValue(error);

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