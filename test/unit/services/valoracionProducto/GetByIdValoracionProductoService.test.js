
import GetByIdValoracionProductoService from '../../../../src/services/ValoracionProducto/GetByIdValoracionProductoService.js';

describe('GetByIdValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            getById: jest.fn()
        };
        service = new GetByIdValoracionProductoService(repository);
    });

    it('debe retornar una valoración de producto por su id', async () => {
        const valoracion = { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' };
        repository.getById.mockResolvedValue(valoracion);

        const result = await service.execute(1);

        expect(repository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(valoracion);
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new GetByIdValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe lanzar un error si la valoración no es encontrada', async () => {
        repository.getById.mockResolvedValue(null);

        await expect(service.execute(1)).rejects.toThrow('Valoración no encontrada');
    });

    it('debe llamar a getById con paranoid false', async () => {
        const valoracion = { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' };
        repository.getById.mockResolvedValue(valoracion);

        const result = await service.execute(1, false);

        expect(repository.getById).toHaveBeenCalledWith(1, false);
        expect(result).toEqual(valoracion);
    });
});
