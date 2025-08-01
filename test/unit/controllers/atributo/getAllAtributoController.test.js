// Mock del servicio antes de importar el controlador
const mockExecute = jest.fn();
jest.mock('../../../../src/services/atributo/GetAllAtributoService.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            execute: mockExecute
        };
    });
});

import GetAllAtributoController from '../../../../src/controllers/atributo/GetAllAtributoController.js';
import GetAllAtributoService from '../../../../src/services/atributo/GetAllAtributoService.js';

describe('Unit Test: GetAllAtributoController', () => {
    let controller;
    const mockResponse = [
            { id: 1, nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 2, nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { id: 3, nombre: 'Unidades', valor_string: null, valor_numerico: 3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null }
        ];

    beforeEach(() => {
        GetAllAtributoService.mockClear();
        mockExecute.mockClear();
        controller = new GetAllAtributoController();
    });

    it('Obtiene todos los atributos exitosamente', async () => {
        // Arrange
        mockExecute.mockResolvedValue(mockResponse);

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Act
        await controller.execute({}, res);

        // Assert
        expect(mockExecute).toHaveBeenCalledWith();
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled(); // No se llama a status porque fue exitoso
    });

    it('Maneja errores del servicio correctamente', async () => {
        // Arrange
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const error = new Error('Error de base de datos');
        mockExecute.mockRejectedValue(error);

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