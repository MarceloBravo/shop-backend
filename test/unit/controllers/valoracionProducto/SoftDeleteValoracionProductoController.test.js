
import SoftDeleteValoracionProductoController from '../../../../src/controllers/ValoracionProducto/SoftDeleteValoracionProductoController.js';

describe('SoftDeleteValoracionProductoController', () => {
    let controller;
    let service;
    let req;
    let res;

    const mockRepository = {
        siftDelete: jest.fn(),
        getById: jest.fn(),
        getBy: jest.fn()
    }

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new SoftDeleteValoracionProductoController(mockRepository);
        controller.service = service;
        req = {
            params: { id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe eliminar lógicamente una valoración de producto', async () => {
        service.execute.mockResolvedValue(true);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ code: true, mensaje: 'El registro ha sido borrado exitosamente.' });
    });

    it('debe manejar el caso en que el registro no se elimina', async () => {
        service.execute.mockResolvedValue(false);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ code: false, mensaje: 'El registro no pudo ser borrado o registro inexistente' });
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al eliminar la valoración');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al eliminar la valoración', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new SoftDeleteValoracionProductoController()).toThrow('No se ha recibido un repositorio');
    });
});
