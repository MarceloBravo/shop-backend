import GetByIdMenuTiendaWithDeletedController from '../../../../src/controllers/menuTienda/GetByIdMenuTiendaWithDeletedController.js';

const mockService = {
    execute: jest.fn()
};

jest.mock('../../../../src/services/menuTienda/GetByIdMenuTiendaService.js', () => {
    return jest.fn().mockImplementation(() => mockService);
});

import { handleError } from '../../../../src/shared/functions.js';
jest.mock('../../../../src/shared/functions.js', () => ({
    ...jest.requireActual('../../../../src/shared/functions.js'),
    handleError: jest.fn((e) => ({ code: e.code || 500, error: e.message, details: e.details || [] }))
}));

describe('Unit Test: GetByIdMenuTiendaWithDeletedController', () => {
    let controller;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new GetByIdMenuTiendaWithDeletedController();
        controller.service = mockService;
    });

    it('Obtiene un menuTienda por id con eliminados exitosamente', async () => {
        const mockResponse = { id: 1, nombre: 'Inicio', icono: 'path/to/icono.png', menu_padre_id: null, uri: '/inicio', posicion: 1, pantalla_id: 1 };
        mockService.execute.mockResolvedValue(mockResponse);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await controller.execute(req, res);

        expect(mockService.execute).toHaveBeenCalledWith(1, false);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('Maneja el caso en que el menuTienda no se encuentra', async () => {
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
});