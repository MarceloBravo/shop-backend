// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/MaterialRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateMaterialesController from '../../../../src/controllers/materiales/CreateMaterialController.js';

describe('Unit Test: CreateMaterialesController', () => {
    let controller;

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        controller = new CreateMaterialesController(mockRepository);
    });

    
    it('Crea un materiales exitosamente', async () => {
        // Arrange
        const materialesData = { valor: 'Lana' };
        const mockResponse = { id: 1, ...materialesData };
        mockRepository.create.mockResolvedValue(mockResponse);

        // Configuramos el mock para que getBy devuelva null
        mockRepository.getBy = jest.fn().mockResolvedValue(null);

        const req = {
            body: { valor: 'Cuero' } // Aseguramos que los datos coincidan
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith({ valor: 'Cuero' }, null);
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
                            "El campo valor es obligatorio y debe tener un máximo de hasta 30 carácteres."
                           ], 
                "error": "Error: Datos no válidos:"
            });
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const materialesData = { valor: 'Algodón' };
        const req = {
            body: materialesData
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