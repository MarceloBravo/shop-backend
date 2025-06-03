// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/ColorRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateColorController from '../../../../src/controllers/color/CreateColorController.js';

describe('Unit Test: CreateColorController', () => {
    let controller;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        controller = new CreateColorController(mockRepository);
    });

    it('Crea un color exitosamente', async () => {
        // Arrange
        const colorData = { nombre: 'Rojo', valor: '#FF0000' };
        const mockResponse = { id: 1, ...colorData };
        mockRepository.create.mockResolvedValue(mockResponse);

        const req = {
            body: colorData
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith(colorData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { nombre: '', valor: '' };
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
            mensaje: expect.stringContaining('Datos no válidos')
        }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const colorData = { nombre: 'Rojo', valor: '#FF0000' };
        const req = {
            body: colorData
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
            mensaje: expect.any(String)
        }));
    });
}); 