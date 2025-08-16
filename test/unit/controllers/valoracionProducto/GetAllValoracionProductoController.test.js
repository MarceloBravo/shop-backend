
import GetAllValoracionProductoController from '../../../../src/controllers/ValoracionProducto/GetAllValoracionProductoController.js';

describe('GetAllValoracionProductoController', () => {
    let controller;
    let service;
    let req;
    let res;

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new GetAllValoracionProductoController();
        controller.service = service;
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe retornar todas las valoraciones de productos', async () => {
        const valoraciones = [
            { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' },
            { id: 2, id_producto: 2, id_usuario: 2, calificacion: 4, comentario: 'Bueno' }
        ];
        service.execute.mockResolvedValue(valoraciones);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(valoraciones);
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al obtener las valoraciones');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al obtener las valoraciones', details: [] });
    });
});
