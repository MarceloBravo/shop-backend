import GetPagePantallaController from '../../../../src/controllers/pantalla/GetPagePantallaController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/pantalla/GetPagePantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetPagePantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPagePantallaController();
        controller.service = mockService;
    });

    it('Obtiene una pagina de pantallas exitosamente', async () => {
        const mockResponse = { rows: [{ id: 1, nombre: 'ADMIN', uri: 'admin' }], count: 1, totPag: 1 };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { pag: 1, limit: 10 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, 10);
        expect(res.json).toHaveBeenCalledWith({ data: { data: mockResponse.rows, totReg: mockResponse.count, rows: mockResponse.rows.length, pag: 1, totPag: mockResponse.totPag } });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores internos correctamente', async () => {
        const req = { params: { pag: 1, limit: 10 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Error de base de datos');
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });
});