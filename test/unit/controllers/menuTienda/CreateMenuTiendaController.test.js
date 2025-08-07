import CreateMenuTiendaController from '../../../../src/controllers/menuTienda/CreateMenuTiendaController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/menuTienda/CreateMenuTiendaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: CreateMenuTiendaController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new CreateMenuTiendaController();
        controller.service = mockService;
    });

    it('Crea un menuTienda exitosamente', async () => {
        const data = { nombre: 'Inicio', icono: 'path/to/icono.png', menu_padre_id: null, uri: '/inicio', posicion: 1, pantalla_id: 1 };
        const mockResponse = { id: 1, ...data };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { body: data };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(data);
        expect(res.json).toHaveBeenCalledWith({ data: mockResponse, mensaje: 'El registro ha sido creado exitosamente.' });
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja errores de validación correctamente', async () => {
        const req = { body: {} };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = { message: 'Datos no válidos:', code: 400, details: ['Campo requerido'] };
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ code: 400, error: 'Datos no válidos:', details: ['Campo requerido'] });
    });

    it('Maneja errores internos correctamente', async () => {
        const req = { body: { nombre: 'Inicio', icono: 'path/to/icono.png', menu_padre_id: null, uri: '/inicio', posicion: 1, pantalla_id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Error de base de datos');
        mockService.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error de base de datos', details: [] });
    });
});