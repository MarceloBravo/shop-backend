import GetByProductoService from '../../../../src/services/producto/GetByProductoService.js';
import { jest } from '@jest/globals';

describe('GetByProductoService', () => {
    let mockRepository;
    let service;
    let mockProduct;

    beforeEach(() => {
        mockRepository = {
            getById: jest.fn(),
            query: jest.fn()
        };
        service = new GetByProductoService(mockRepository);
        mockProduct = {
            id: 1,
            nombre: 'Test Product',
            descripcion: 'Test Description',
            precio: 100,
            stock: 10,
            categoria_id: 1,
            marca_id: 1
        };
    });

    it('should get product by id with default parameters', async () => {
        mockRepository.getById.mockResolvedValue(mockProduct);

        const result = await service.execute(1);

        expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockProduct);
    });

    it('should get product by query', async () => {
        mockRepository.query.mockResolvedValue(mockProduct);

        const result = await service.execute(1, true);

        expect(mockRepository.query).toHaveBeenCalledWith(1, true);
        expect(result).toEqual(mockProduct);
    });

    it('should get deleted product when paranoid is false', async () => {
        mockRepository.getById.mockResolvedValue(mockProduct);

        const result = await service.execute(1, false, false);

        expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
        expect(result).toEqual(mockProduct);
    });

    it('should throw 404 error when product is not found', async () => {
        mockRepository.getById.mockResolvedValue(null);

        await expect(service.execute(999))
            .rejects
            .toThrow('Producto no encontrado');
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new GetByProductoService()).toThrow('El repositorio es requerido');
    });
});
