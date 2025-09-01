import GetPageAccionesPantallaController from '../../../../src/controllers/accionesPantalla/GetPageAccionesPantallaController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    getPage: jest.fn()
}

jest.mock('../../../../src/services/accionesPantalla/GetPageAccionesPantallaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetPageAccionesPantallaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetPageAccionesPantallaController(mockRepository);
        controller.service = mockService;
    });

    it('Obtiene una página de acciones de pantalla exitosamente', async () => {
        const mockRows = [{ id: 1, nombre: 'VER' }, { id: 2, nombre: 'EDITAR' }];
        const mockResponse = { rows: mockRows, count: 2, totPag: 1 };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { pag: 1, limit: 10 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, 10);
        expect(res.json).toHaveBeenCalledWith({ data: { data: mockRows, totReg: 2, rows: 2, pag: 1, totPag: 1 } });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores correctamente', async () => {
        const req = { params: { pag: 1, limit: 10 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Error de base de datos', code: 500, details: [] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new GetPageAccionesPantallaController()).toThrow('No se ha recibido un repositorio');
    });
}); 