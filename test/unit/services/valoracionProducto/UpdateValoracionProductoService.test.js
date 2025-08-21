
import UpdateValoracionProductoService from '../../../../src/services/ValoracionProducto/UpdateValoracionProductoService.js';

describe('UpdateValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            update: jest.fn()
        };
        service = new UpdateValoracionProductoService(repository);
    });

    it('debe actualizar una valoración de producto correctamente', async () => {
        const id = 1;
        const data = {
            producto_id: 1,
            estrellas: 4,
            comentario: 'Buen producto'
        };
        const expectedValoracion = { id, ...data };
        repository.update.mockResolvedValue(expectedValoracion);

        const result = await service.execute(id, data);

        expect(repository.update).toHaveBeenCalledWith(id, data, null);
        expect(result).toEqual(expectedValoracion);
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new UpdateValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe lanzar un error si los datos de la valoración no son válidos', async () => {
        const id = 1;
        const data = {
            estrellas: 6, // Calificación inválida
            comentario: 'Buen producto'
        };

        await expect(service.execute(id, data)).rejects.toThrow();
    });
});
