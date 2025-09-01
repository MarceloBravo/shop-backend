import GetAllAccionesPantallaController from '../../../../src/controllers/accionesPantalla/GetAllAccionesPantallaController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    getAll: jest.fn()
}

jest.mock('../../../../src/services/accionesPantalla/GetAllAccionesPantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetAllAccionesPantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllAccionesPantallaController(mockRepository);
        controller.service = mockService;
    });

    it('Obtiene todas las acciones de pantalla exitosamente', async () => {
        const mockResponse = [{ id: 1, nombre: 'VER' }, { id: 2, nombre: 'EDITAR' }];
        mockService.execute.mockResolvedValue(mockResponse);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores correctamente', async () => {
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Error de base de datos', code: 500, details: [] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new GetAllAccionesPantallaController()).toThrow('No se ha recibido un repositorio');
    });
}); 