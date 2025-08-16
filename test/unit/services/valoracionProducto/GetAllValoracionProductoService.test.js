
import GetAllValoracionProductoService from '../../../../src/services/ValoracionProducto/GetAllValoracionProductoService.js';

describe('GetAllValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            getAll: jest.fn()
        };
        service = new GetAllValoracionProductoService(repository);
    });

    it('debe retornar todas las valoraciones de productos', async () => {
        const valoraciones = [
            { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' },
            { id: 2, id_producto: 2, id_usuario: 2, calificacion: 4, comentario: 'Bueno' }
        ];
        repository.getAll.mockResolvedValue(valoraciones);

        const result = await service.execute();

        expect(repository.getAll).toHaveBeenCalledWith(true);
        expect(result).toEqual(valoraciones);
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new GetAllValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe llamar a getAll con paranoid false', async () => {
        const valoraciones = [
            { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' },
            { id: 2, id_producto: 2, id_usuario: 2, calificacion: 4, comentario: 'Bueno' }
        ];
        repository.getAll.mockResolvedValue(valoraciones);

        const result = await service.execute(false);

        expect(repository.getAll).toHaveBeenCalledWith(false);
        expect(result).toEqual(valoraciones);
    });
});
