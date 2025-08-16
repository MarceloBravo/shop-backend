
import CreateValoracionProductoService from '../../../../src/services/ValoracionProducto/CreateValoracionProductoService.js';

describe('CreateValoracionProductoService', () => {
    let repository;
    let service;

    beforeEach(() => {
        repository = {
            create: jest.fn()
        };
        service = new CreateValoracionProductoService(repository);
    });

    it('debe crear una nueva valoración de producto correctamente', async () => {
        const data = {
            producto_id: 1,
            estrellas: 5,
            comentario: 'Excelente producto'
        };
        const expectedValoracion = { id: 1, ...data };
        repository.create.mockResolvedValue(expectedValoracion);

        const result = await service.execute(data);

        expect(repository.create).toHaveBeenCalledWith(data, null);
        expect(result).toEqual(expectedValoracion);
    });

    it('debe lanzar un error si el repositorio no es proporcionado', () => {
        expect(() => new CreateValoracionProductoService()).toThrow('El repositorio es requerido');
    });

    it('debe lanzar un error si los datos de la valoración no son válidos', async () => {
        const data = {
            producto_id: 1,
            estrellas: 6, // Calificación inválida
            comentario: 'Excelente producto'
        };

        await expect(service.execute(data)).rejects.toThrow('Datos no válidos:');
    });
});
