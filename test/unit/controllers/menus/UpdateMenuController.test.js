import UpdateMenuController from '../../../../src/controllers/menu/UpdateMenuController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/menu/UpdateMenuService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: UpdateMenuController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new UpdateMenuController();
        controller.service = mockService;
    });

    it('Actualiza un menu exitosamente', async () => {
        const data = { nombre: 'Inicio' };
        const mockResponse = { data: { id: 1, ...data }, created: false };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { id: 1 }, body: data };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, data);
        expect(res.json).toHaveBeenCalledWith({ data: mockResponse.data, mensaje: `Registro actualizado exitosamente.` });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        const req = { params: { id: 1 }, body: {} };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Datos no válidos:', code: 400, details: ['Campo requerido'] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ code: 400, error: 'Datos no válidos:', details: ['Campo requerido'] });
    });

    it('Maneja errores internos correctamente', async () => {
        const req = { params: { id: 1 }, body: { nombre: 'Inicio' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Error de base de datos');
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });
});