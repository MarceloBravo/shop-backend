import GetByIdAccionesPantallaController from '../../../../src/controllers/accionesPantalla/GetByIdAccionesPantallaController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/accionesPantalla/GetByIdAccionesPantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetByIdAccionesPantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetByIdAccionesPantallaController();
        controller.service = mockService;
    });

    it('Obtiene una acción de pantalla por ID exitosamente', async () => {
        const mockResponse = { id: 1, nombre: 'VER' };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores correctamente', async () => {
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'No encontrado', code: 404, details: [] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ code: 404, error: 'No encontrado', details: [] });
    });
}); 