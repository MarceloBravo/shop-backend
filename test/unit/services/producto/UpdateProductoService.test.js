import UpdateProductoService from '../../../../src/services/producto/UpdateProductoService.js';
import SubCategoriaRepository from '../../../../src/repositories/SubCategoriaRepository.js';
import GeneroRepository from '../../../../src/repositories/GeneroRepository.js';
import MarcaRepository from '../../../../src/repositories/MarcaRepository.js';
import { jest } from '@jest/globals';

jest.mock('../../../../src/repositories/SubCategoriaRepository.js');
jest.mock('../../../../src/repositories/GeneroRepository.js');
jest.mock('../../../../src/repositories/MarcaRepository.js');       


describe('UpdateProductoService', () => {
    let mockRepository;
    let service;
    let mockProduct;
    let updateData;

    beforeAll(async () => {
        SubCategoriaRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
        GeneroRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
        MarcaRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
    });
    

    beforeEach(() => {
        mockRepository = {
            getById: jest.fn(),
            update: jest.fn()
        };
        service = new UpdateProductoService(mockRepository);
        mockProduct = {
            id: 1,
            sku: 'SKU123',
            nombre: 'Test Product',
            descripcion: 'Test Description',
            sub_categoria_id: 1,
            genero_id: 1,
            marca_id: 1,
            precio: 100.00,
            stock: 10,
            categoria_id: 1
        };
        updateData = {
            sku: 'SKU456',
            nombre: 'Updated Product',
            descripcion: 'Updated Description',
            sub_categoria_id: 1,
            genero_id: 1,
            marca_id: 1,
            precio: 200.00,
            stock: 20,
            categoria_id: 1
        };
    });

    it('should update product successfully', async () => {
        mockRepository.getById.mockResolvedValue(mockProduct);
        mockRepository.update.mockResolvedValue({ ...mockProduct, ...updateData });

        const result = await service.execute(1, updateData);

        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.update).toHaveBeenCalledWith(1, updateData, null);
        expect(result).toEqual({ ...mockProduct, ...updateData });
    });

    it('should update with transaction', async () => {
        const mockTransaction = { id: 'transaction-1' };
        mockRepository.getById.mockResolvedValue(mockProduct);
        mockRepository.update.mockResolvedValue({ ...mockProduct, ...updateData });

        const result = await service.execute(1, updateData, mockTransaction);

        expect(mockRepository.getById).toHaveBeenCalledWith(1);
        expect(mockRepository.update).toHaveBeenCalledWith(1, updateData, mockTransaction);
        expect(result).toEqual({ ...mockProduct, ...updateData });
    });

    it('should throw 404 error when product is not found', async () => {
        mockRepository.getById.mockResolvedValue(null);

        await expect(service.execute(999, updateData))
            .rejects
            .toThrow('Producto no encontrado');
    });

    it('should validate data before updating', async () => {
        mockRepository.getById.mockResolvedValue(mockProduct);
        const invalidData = { ...updateData, precio: 'invalid' };

        await expect(service.execute(1, invalidData))
            .rejects
            .toThrow();
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new UpdateProductoService()).toThrow('El repositorio es requerido');
    });
});
