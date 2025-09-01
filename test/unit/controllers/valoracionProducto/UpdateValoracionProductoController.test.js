
import UpdateValoracionProductoController from '../../../../src/controllers/ValoracionProducto/UpdateValoracionProductoController.js';

describe('UpdateValoracionProductoController', () => {
    let controller;
    let service;
    let req;
    let res;

    const mockRepository = {
        update: jest.fn(),
        getById: jest.fn(),
        getBy: jest.fn()
    }

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new UpdateValoracionProductoController(mockRepository);
        controller.service = service;
        req = {
            params: { id: 1 },
            body: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe actualizar una valoración de producto correctamente', async () => {
        const result = { data: { id: 1, calificacion: 5 }, created: false };
        service.execute.mockResolvedValue(result);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1, req.body);
        expect(res.json).toHaveBeenCalledWith({ valoracion: result.data, mensaje: `Registro actualizado exitosamente.` });
    });

    it('debe crear una valoración de producto correctamente', async () => {
        const result = { data: { id: 1, calificacion: 5 }, created: true };
        service.execute.mockResolvedValue(result);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1, req.body);
        expect(res.json).toHaveBeenCalledWith({ valoracion: result.data, mensaje: `Registro creado exitosamente.` });
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al actualizar la valoración');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al actualizar la valoración', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new UpdateValoracionProductoController()).toThrow('No se ha recibido un repositorio');
    });
});
