
import SoftDeleteValoracionProductoService from '../../../../src/services/ValoracionProducto/SoftDeleteValoracionProductoService.js';

describe('SoftDeleteValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            getById: jest.fn(),
            softDelete: jest.fn()
        };
        service = new SoftDeleteValoracionProductoService(repository);
    });

    it('debe eliminar lógicamente una valoración de producto', async () => {
        const valoracion = { id: 1, id_producto: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente' };
        repository.getById.mockResolvedValue(valoracion);
        repository.softDelete.mockResolvedValue({ result: true });

        const result = await service.execute(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(repository.softDelete).toHaveBeenCalledWith(1, null);
        expect(result).toBe(true);
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new SoftDeleteValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe lanzar un error si la valoración no es encontrada', async () => {
        repository.getById.mockResolvedValue(null);

        await expect(service.execute(1)).rejects.toThrow('Valoración no encontrada');
    });
});
