// Mock del repositorio antes de importar el conttallaNumeroador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/TallaNumeroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateTallaNumeroController from '../../../../src/controllers/tallaNumero/CreateTallaNumeroController.js';


describe('Unit Test: CreateTallaNumeroController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new CreateTallaNumeroController(mockRepository);
    });

    it('Crea un tallaNumero exitosamente', async () => {
        // Arrange
        const tallaNumeroData = { valor: 40 };
        const mockResponse = { id: 1, ...tallaNumeroData };
        mockRepository.create.mockResolvedValue(mockResponse);

        const req = {
            body: { valor: 40 }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ valor: 40 }, null);
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
            details: ["El campo valor es obligatorio."],
            error: "Error: Datos no válidos:"
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const tallaNumeroData = { valor: 40 };
        const req = {
            body: tallaNumeroData
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