import SoftDeleteMenuTiendaController from '../../../../src/controllers/menuTienda/SoftDeleteMenuTiendaController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    softDelete: jest.fn(),
    getById: jest.fn(),
    getBy: jest.fn()
}

jest.mock('../../../../src/services/menuTienda/SoftDeleteMenuTiendaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: SoftDeleteMenuTiendaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new SoftDeleteMenuTiendaController(mockRepository);
        controller.service = mockService;
    });

    it('Borra un menuTienda exitosamente', async () => {
        mockService.execute.mockResolvedValue(true);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ code: true, mensaje: 'El registro ha sido borrado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja el caso en que el menuTienda no se encuentra', async () => {
        mockService.execute.mockResolvedValue(false);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ code: false, mensaje: 'El registro no púdo ser borrado o registro inexistente' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores internos correctamente', async () => {
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Error de base de datos');
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new SoftDeleteMenuTiendaController()).toThrow('No se ha recibido un repositorio');
    });
});