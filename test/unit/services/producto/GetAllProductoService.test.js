import GetAllProductoService from '../../../../src/services/producto/GetAllProductoService.js';
import { jest } from '@jest/globals';

describe('GetAllProductoService', () => {
    let mockRepository;
    let service;
    let mockProducts;

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn()
        };
        service = new GetAllProductoService(mockRepository);
        mockProducts = [
            { 
                id: 1, 
                nombre: 'Product 1',
                descripcion: 'Description 1',
                precio: 100,
                stock: 10,
                categoria_id: 1,
                marca_id: 1
            },
            { 
                id: 2, 
                nombre: 'Product 2',
                descripcion: 'Description 2',
                precio: 200,
                stock: 20,
                categoria_id: 1,
                marca_id: 1
            }
        ];
    });

    it('should get all products with default parameters', async () => {
        mockRepository.getAll.mockResolvedValue(mockProducts);

        const result = await service.execute();

        expect(mockRepository.getAll).toHaveBeenCalledWith(true, {});
        expect(result).toEqual(mockProducts);
    });

    it('should get all products including deleted ones', async () => {
        mockRepository.getAll.mockResolvedValue(mockProducts);

        const result = await service.execute(false);

        expect(mockRepository.getAll).toHaveBeenCalledWith(false, {});
        expect(result).toEqual(mockProducts);
    });

    it('should get products with filter', async () => {
        const filter = { categoria_id: 1 };
        mockRepository.getAll.mockResolvedValue([mockProducts[0]]);

        const result = await service.execute(true, filter);

        expect(mockRepository.getAll).toHaveBeenCalledWith(true, filter);
        expect(result).toEqual([mockProducts[0]]);
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new GetAllProductoService()).toThrow('El repositorio es requerido');
    });
});
