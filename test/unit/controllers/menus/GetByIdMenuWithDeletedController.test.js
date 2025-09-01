import GetByIdMenuWithDeletedController from '../../../../src/controllers/menu/GetByIdMenuWithDeletedController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    getById: jest.fn()
}

jest.mock('../../../../src/services/menu/GetByIdMenuService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetByIdMenuWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetByIdMenuWithDeletedController(mockRepository);
        controller.service = mockService;
    });

    it('Obtiene un menu por id con eliminados exitosamente', async () => {
        const mockResponse = { id: 1, nombre: 'Inicio' };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, false);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja el caso en que el menu no se encuentra', async () => {
        mockService.execute.mockResolvedValue(null);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, false);
        expect(res.json).toHaveBeenCalledWith(null);
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
        expect(() => new GetByIdMenuWithDeletedController()).toThrow('No se ha recibido un repositorio');
    });
});