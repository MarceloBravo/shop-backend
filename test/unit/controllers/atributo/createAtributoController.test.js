// Mock del repositorio antes de importar el controlador
const mockRepository = {
    create: jest.fn()
};

jest.mock('../../../../src/repositories/AtributosRepository.js', () => {
    return jest.fn().mockImplementation(() => mockRepository);
});

import CreateAtributoController from '../../../../src/controllers/atributo/CreateAtributoController.js';

describe('Unit Test: CreateAtributoController', () => {
    let controller;
    const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

    beforeEach(() => {
        // Limpia todos los mocks antes de cada test
        jest.clearAllMocks();
        controller = new CreateAtributoController(mockRepository);
    });

    
    it('Crea un atributo exitosamente', async () => {
        // Arrange
        const mockResponse = { id: 1, ...atributoData };
        mockRepository.create.mockResolvedValue(mockResponse);

        // Configuramos el mock para que getBy devuelva null
        mockRepository.getBy = jest.fn().mockResolvedValue(null);

        const req = {
            body: atributoData // Aseguramos que los datos coincidan
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute(req, res);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith(atributoData, null);
        expect(res.json).toHaveBeenCalledWith({
            data: mockResponse,
            mensaje: 'El registro ha sido creado exitosamente.'
        });
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores de validación correctamente', async () => {
        // Arrange
        const invalidData = { nombre: '', valor_string: null, valor_numerico: 'abc' };
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
                "code":400,
                "details":[
                    "El valor ingresado para el nombre del atributo no es válido.",
                    "El valor ingresado para el atributo numérico no es válido. Ingresa sólo números positivos."
                ],
                "error":"Error: Datos no válidos:"
            }
        ));
    });

    it('Maneja errores del repositorio correctamente', async () => {
        // Arrange
        const req = {
            body: atributoData
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