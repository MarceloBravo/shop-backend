
import HardDeleteValoracionProductoService from '../../../../src/services/ValoracionProducto/HardDeleteValoracionProductoService.js';

describe('HardDeleteValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            getById: jest.fn(),
            hardDelete: jest.fn()
        };
        service = new HardDeleteValoracionProductoService(repository);
    });

    it('debe eliminar físicamente una valoración de producto', async () => {
        const valoracion = { id: 1, producto_id: 1, estrellas: 5, comentario: 'Excelente' };
        repository.getById.mockResolvedValue(valoracion);
        repository.hardDelete.mockResolvedValue({ message: 'Valoración eliminada correctamente' });

        const result = await service.execute(1);

        expect(repository.getById).toHaveBeenCalledWith(1, false);
        expect(repository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toEqual({ message: 'Valoración eliminada correctamente' });
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new HardDeleteValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe lanzar un error si la valoración no es encontrada', async () => {
        repository.getById.mockResolvedValue(null);

        await expect(service.execute(1)).rejects.toThrow('Valoración no encontrada');
    });
});
