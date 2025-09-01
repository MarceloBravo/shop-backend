
import CreateValoracionProductoController from '../../../../src/controllers/ValoracionProducto/CreateValoracionProductoController.js';

describe('CreateValoracionProductoController', () => {
    let controller;
    let service;
    let req;
    let res;
    const mockRepository = {
        create: jest.fn()
    }

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new CreateValoracionProductoController(mockRepository);
        controller.service = service;
        req = {
            body: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe crear una nueva valoración de producto correctamente', async () => {
        const data = { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' };
        service.execute.mockResolvedValue(data);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith({ data, mensaje: 'El registro ha sido creado exitosamente.' });
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al crear la valoración');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al crear la valoración', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new CreateValoracionProductoController()).toThrow('No se ha recibido un repositorio');
    });
});
