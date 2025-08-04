// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/MarcaRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateMarcaController from '../../../../src/controllers/marca/CreateMarcaController.js';

describe('Unit Test: CreateMarcaController', () => {
    let controller;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        controller = new CreateMarcaController(mockRepository);
    });

    
    it('Crea un marca exitosamente', async () => {
        // Arrange
        const marcaData = { nombre: 'Adidas', logo:'path/to/logo.png' };
        const mockResponse = { id: 1, ...marcaData };
        mockRepository.create.mockResolvedValue(mockResponse);

        // Configuramos el mock para que getBy devuelva null
        mockRepository.getBy = jest.fn().mockResolvedValue(null);

        const req = {
            body: { nombre: 'Adidas', logo:'path/to/logo.png' } // Aseguramos que los datos coincidan
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ nombre: 'Adidas', logo:'path/to/logo.png' }, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { nombre: '', logo: '' };
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
        expect(res.json).toHaveBeenCalledWith(
            {
                "code": 400, 
                "details": [
                            "El nombre de la marca es obligatorio y debe tener un máximo de hasta 30 carácteres."
                           ], 
                "error": "Error: Datos no válidos:"
            });
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const marcaData = { nombre: 'Adidas', logo:'path/to/logo.png' };
        const req = {
            body: marcaData
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