
import GetPageValoracionProductoService from '../../../../src/services/ValoracionProducto/GetPageValoracionProductoService.js';

describe('GetPageValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            getPage: jest.fn()
        };
        service = new GetPageValoracionProductoService(repository);
        process.env.DEFAULT_REG_POR_PAGINA = 10;
    });

    it('debe retornar una página de valoraciones de productos', async () => {
        const page = 1;
        const limit = 10;
        const valoraciones = {
            rows: [
                { id: 1, producto_id: 1, estrellas: 5, comentario: 'Excelente' },
                { id: 2, producto_id: 2, estrellas: 4, comentario: 'Bueno' }
            ],
            count: 2
        };
        repository.getPage.mockResolvedValue(valoraciones);

        const result = await service.execute(page, limit);

        expect(repository.getPage).toHaveBeenCalledWith(0, limit, true);
        expect(result).toEqual({ ...valoraciones, totPag: 1 });
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new GetPageValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe usar valores por defecto para page y limit', async () => {
        const valoraciones = {
            rows: [],
            count: 0
        };
        repository.getPage.mockResolvedValue(valoraciones);

        const result = await service.execute();

        expect(repository.getPage).toHaveBeenCalledWith(0, 10, true);
        expect(result).toEqual({ ...valoraciones, totPag: 0 });
    });
});
