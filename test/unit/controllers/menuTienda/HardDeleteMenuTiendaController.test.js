import HardDeleteMenuTiendaController from '../../../../src/controllers/menuTienda/HardDeleteMenuTiendaController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    hardDelete: jest.fn(),
    getById: jest.fn(),
    getBy: jest.fn()
}

jest.mock('../../../../src/services/menuTienda/HardDeleteMenuTiendaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: HardDeleteMenuTiendaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new HardDeleteMenuTiendaController(mockRepository);
        controller.service = mockService;
    });

    it('Elimina un menuTienda exitosamente', async () => {
        mockService.execute.mockResolvedValue(true);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1, code: 200, mensaje: 'El registro ha sido eliminado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja el caso en que el menuTienda no se encuentra', async () => {
        mockService.execute.mockResolvedValue(false);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1, code: 500, mensaje: 'El registro no púdo ser eliminado o registro inexistente' });
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
        expect(() => new HardDeleteMenuTiendaController()).toThrow('No se ha recibido un repositorio');
    });
});