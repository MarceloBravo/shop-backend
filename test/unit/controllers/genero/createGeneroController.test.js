// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/GeneroRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateGeneroController from '../../../../src/controllers/genero/CreateGeneroController.js';

describe('Unit Test: CreateGeneroController', () => {
    let controller;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        controller = new CreateGeneroController(mockRepository);
    });

    
    it('Crea un genero exitosamente', async () => {
        // Arrange
        const generoData = { genero: 'Masculino' };
        const mockResponse = { id: 1, ...generoData };
        mockRepository.create.mockResolvedValue(mockResponse);

        // Configuramos el mock para que getBy devuelva null
        mockRepository.getBy = jest.fn().mockResolvedValue(null);

        const req = {
            body: { genero: 'Masculino' } // Aseguramos que los datos coincidan
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ genero: 'Masculino' });
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { genero: '' };
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
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(
            {
                "code": 400, 
                "details": [
                            "El genero es obligatorio y debe ser uno de los siguientes: 'Masculino', 'Femenino', 'Unisex' o 'No aplica'."
                           ], 
                "error": "Error: Datos no válidos:"
            }));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const generoData = { genero: 'Masculino' };
        const req = {
            body: generoData
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