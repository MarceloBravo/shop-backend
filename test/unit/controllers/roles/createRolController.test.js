// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/RolRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateRolController from '../../../../src/controllers/Rol/CreateRolController.js';


describe('Unit Test: CreateRolController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new CreateRolController(mockRepository);
    });

    it('Crea un rol exitosamente', async () => {
        // Arrange
        const rolData = { nombre: 'Administrador' };
        const mockResponse = { id: 1, ...rolData };
        mockRepository.create.mockResolvedValue(mockResponse);

        const req = {
            body: { nombre: 'Administrador' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ nombre: 'Administrador' }, null);
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
            details: ["Ingresa un nombre válido."],
            error: expect.any(String)
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const rolData = { nombre: 'Administrador' };
        const req = {
            body: rolData
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