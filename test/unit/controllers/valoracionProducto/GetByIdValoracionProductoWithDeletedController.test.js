
import GetByIdValoracionProductoWithDeletedController from '../../../../src/controllers/ValoracionProducto/GetByIdValoracionProductoWithDeletedController.js';

describe('GetByIdValoracionProductoWithDeletedController', () => {
    let controller;
    let service;
    let req;
    let res;

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new GetByIdValoracionProductoWithDeletedController();
        controller.service = service;
        req = {
            params: { id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe retornar una valoración de producto por su id, incluyendo las eliminadas', async () => {
        const valoracion = { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' };
        service.execute.mockResolvedValue(valoracion);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1, false);
        expect(res.json).toHaveBeenCalledWith(valoracion);
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Valoración no encontrada');
        error.code = 404;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ code: 404, error: 'Error: Valoración no encontrada', details: [] });
    });
});
