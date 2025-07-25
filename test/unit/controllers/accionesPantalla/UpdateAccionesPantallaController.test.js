import UpdateAccionesPantallaController from '../../../../src/controllers/accionesPantalla/UpdateAccionesPantallaController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/accionesPantalla/UpdateAccionesPantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: UpdateAccionesPantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateAccionesPantallaController();
        controller.service = mockService;
    });

    it('Actualiza una acción de pantalla exitosamente', async () => {
        const mockResult = { data: { id: 1, nombre: 'EDITAR' }, created: false };
        mockService.execute.mockResolvedValue(mockResult);

        const req = { params: { id: 1 }, body: { nombre: 'EDITAR' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, { nombre: 'EDITAR' });
        expect(res.json).toHaveBeenCalledWith({ data: mockResult.data, mensaje: 'Registro actualizado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores correctamente', async () => {
        const req = { params: { id: 1 }, body: { nombre: 'EDITAR' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Error de base de datos', code: 500, details: [] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });
}); 