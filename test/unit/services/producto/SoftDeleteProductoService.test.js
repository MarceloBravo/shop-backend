import SoftDeleteProductoService from '../../../../src/services/producto/SoftDeleteProductoService.js';

describe('SoftDeleteProductoService', () => {
    let service;
    let mockProduct;

    const mockRepository = {
        getById: jest.fn(),
        findBy: jest.fn(),
        softDelete: jest.fn()   
    }

    beforeEach(() => {
        service = new SoftDeleteProductoService(mockRepository);
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

    it('should soft delete product successfully', async () => {
        mockRepository.getById.mockResolvedValue(mockProduct);
        mockRepository.softDelete.mockResolvedValue(true);

        const result = await service.execute(1);

        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, null);
        expect(result).toBe(true);
    });

    it('should soft delete with transaction', async () => {
        const mockTransaction = { id: 'transaction-1' };
        mockRepository.getById.mockResolvedValue(mockProduct);
        mockRepository.softDelete.mockResolvedValue(true);

        const result = await service.execute(1, mockTransaction);

        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.softDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toBe(true);
    });

    it('should throw 404 error when product is not found', async () => {
        mockRepository.getById.mockResolvedValue(null);

        await expect(service.execute(999))
            .rejects
            .toThrow('Producto no encontrado');
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new SoftDeleteProductoService()).toThrow('El repositorio es requerido');
    });
});
