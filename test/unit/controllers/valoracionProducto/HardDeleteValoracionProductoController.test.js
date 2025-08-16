
import HardDeleteValoracionProductoController from '../../../../src/controllers/ValoracionProducto/HardDeleteValoracionProductoController.js';

describe('HardDeleteValoracionProductoController', () => {
    let controller;
    let service;
    let req;
    let res;

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new HardDeleteValoracionProductoController();
        controller.service = service;
        req = {
            params: { id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe eliminar físicamente una valoración de producto', async () => {
        service.execute.mockResolvedValue(true);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1, code: 200, mensaje: 'El registro ha sido eliminado exitosamente.' });
    });

    it('debe manejar el caso en que el registro no se elimina', async () => {
        service.execute.mockResolvedValue(false);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1, code: 500, mensaje: 'El registro no pudo ser eliminado o registro inexistente' });
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al eliminar la valoración');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al eliminar la valoración', details: [] });
    });
});
