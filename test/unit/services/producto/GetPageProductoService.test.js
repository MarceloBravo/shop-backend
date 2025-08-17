import GetPageProductoService from '../../../../src/services/producto/GetPageProductoService.js';
import { jest } from '@jest/globals';

describe('GetPageProductoService', () => {
    let mockRepository;
    let service;
    let mockProducts;
    let mockPaginationResult;

    beforeEach(() => {
        mockRepository = {
            getPage: jest.fn()
        };
        service = new GetPageProductoService(mockRepository);
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
        mockPaginationResult = {
            rows: mockProducts,
            count: 10
        };
    });

    it('should get page with default parameters', async () => {
        mockRepository.getPage.mockResolvedValue(mockPaginationResult);
        const defaultLimit = process.env.DEFAULT_REG_POR_PAGINA || 10;

        const result = await service.execute();

        expect(mockRepository.getPage).toHaveBeenCalledWith(0, parseInt(defaultLimit), true, {});
        expect(result).toEqual({
            rows: mockProducts,
            count: 10,
            totPag: Math.ceil(10 / defaultLimit)
        });
    });

    it('should get specific page with custom limit', async () => {
        mockRepository.getPage.mockResolvedValue(mockPaginationResult);
        const page = 2;
        const limit = 5;

        const result = await service.execute(page, limit);

        expect(mockRepository.getPage).toHaveBeenCalledWith(5, 5, true, {});
        expect(result).toEqual({
            rows: mockProducts,
            count: 10,
            totPag: 2
        });
    });

    it('should get page with deleted items when paranoid is false', async () => {
        mockRepository.getPage.mockResolvedValue(mockPaginationResult);
        
        const result = await service.execute(1, 10, false);

        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, false, {});
        expect(result).toEqual({
            rows: mockProducts,
            count: 10,
            totPag: 1
        });
    });

    it('should get page with filter', async () => {
        const filter = { categoria_id: 1 };
        mockRepository.getPage.mockResolvedValue({
            rows: [mockProducts[0]],
            count: 1
        });

        const result = await service.execute(1, 10, true, filter);

        expect(mockRepository.getPage).toHaveBeenCalledWith(0, 10, true, filter);
        expect(result).toEqual({
            rows: [mockProducts[0]],
            count: 1,
            totPag: 1
        });
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new GetPageProductoService()).toThrow('El repositorio es requerido');
    });
});
