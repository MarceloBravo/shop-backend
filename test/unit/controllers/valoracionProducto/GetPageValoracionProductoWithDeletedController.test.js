
import GetPageValoracionProductoWithDeletedController from '../../../../src/controllers/ValoracionProducto/GetPageValoracionProductoWithDeletedController.js';

describe('GetPageValoracionProductoWithDeletedController', () => {
    let controller;
    let service;
    let req;
    let res;

    const mockRepository = {
        getPage: jest.fn()
    }

    beforeEach(() => {
        service = {
            execute: jest.fn()
        };
        controller = new GetPageValoracionProductoWithDeletedController(mockRepository);
        controller.service = service;
        req = {
            params: { pag: 1, limit: 10 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
    });

    it('debe retornar una página de valoraciones de productos, incluyendo las eliminadas', async () => {
        const valoraciones = {
            rows: [
                { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' },
                { id: 2, id_producto: 2, id_usuario: 2, calificacion: 4, comentario: 'Bueno' }
            ],
            count: 2,
            totPag: 1
        };
        service.execute.mockResolvedValue(valoraciones);

        await controller.execute(req, res);

        expect(service.execute).toHaveBeenCalledWith(1, 10, false);
        expect(res.json).toHaveBeenCalledWith({ data: { data: valoraciones.rows, totReg: valoraciones.count, rows: valoraciones.rows.length, pag: 1, totPag: 1 } });
    });

    it('debe manejar errores correctamente', async () => {
        const error = new Error('Error al obtener la página de valoraciones');
        error.code = 500;
        service.execute.mockRejectedValue(error);

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, error: 'Error: Error al obtener la página de valoraciones', details: [] });
    });

    it('throw a error if none repository is provided', () => {
        expect(() => new GetPageValoracionProductoWithDeletedController()).toThrow('No se ha recibido un repositorio');
    });
});
