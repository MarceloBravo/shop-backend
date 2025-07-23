import SoftDeleteAccionesPantallaController from '../../../../src/controllers/accionesPantalla/SoftDeleteAccionesPantallaController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/accionesPantalla/SoftDeleteAccionesPantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: SoftDeleteAccionesPantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new SoftDeleteAccionesPantallaController();
        controller.service = mockService;
    });

    it('Elimina lógicamente una acción de pantalla exitosamente', async () => {
        mockService.execute.mockResolvedValue(200);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ code: 200, mensaje: 'El registro ha sido borrado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores correctamente', async () => {
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Error de base de datos', code: 500, details: [] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });
}); 