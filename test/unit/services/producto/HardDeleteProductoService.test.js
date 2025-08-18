import HardDeleteProductoService from '../../../../src/services/producto/HardDeleteProductoService.js';
import { jest } from '@jest/globals';

describe('HardDeleteProductoService', () => {
    let mockRepository;
    let service;
    let mockProduct;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            getById: jest.fn(),
            hardDelete: jest.fn()
        };
        service = new HardDeleteProductoService(mockRepository);
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

    it('should hard delete product successfully', async () => {
        mockRepository.findById.mockResolvedValue(mockProduct);
        mockRepository.hardDelete.mockResolvedValue(true);

        const result = await service.execute(1);

        expect(mockRepository.findById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, null);
        expect(result).toBe(true);
    });

    it('should hard delete with transaction', async () => {
        const mockTransaction = { id: 'transaction-1' };
        mockRepository.findById.mockResolvedValue(mockProduct);
        mockRepository.hardDelete.mockResolvedValue(true);

        const result = await service.execute(1, mockTransaction);

        expect(mockRepository.findById).toHaveBeenCalledWith(1, false);
        expect(mockRepository.hardDelete).toHaveBeenCalledWith(1, mockTransaction);
        expect(result).toBe(true);
    });

    it('should throw 404 error when product is not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(service.execute(999))
            .rejects
            .toThrow('Producto no encontrado');
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new HardDeleteProductoService()).toThrow('El repositorio es requerido');
    });
});
