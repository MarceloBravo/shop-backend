import GetAllMenuTiendaWithDeletedController from '../../../../src/controllers/menuTienda/GetAllMenuTiendaWithDeletedController.js';

const mockService = {
    execute: jest.fn()
};

const mockRepository = {
    getAll: jest.fn()
}

jest.mock('../../../../src/services/menuTienda/GetAllMenuTiendaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetAllMenuTiendaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetAllMenuTiendaWithDeletedController(mockRepository);
        controller.service = mockService;
    });

    it('Obtiene todos los menuTiendas con eliminados exitosamente', async () => {
        const mockResponse = [{ nombre: 'Inicio', icono: 'path/to/icono.png', menu_padre_id: null, uri: '/inicio', posicion: 1, pantalla_id: 1 }];
        mockService.execute.mockResolvedValue(mockResponse);

        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores internos correctamente', async () => {
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Error de base de datos');
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new GetAllMenuTiendaWithDeletedController()).toThrow('No se ha recibido un repositorio');
    });
});