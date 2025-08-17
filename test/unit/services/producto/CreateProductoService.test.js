import CreateProductoService from '../../../../src/services/producto/CreateProductoService.js';
import SubCategoriaRepository from '../../../../src/repositories/SubCategoriaRepository.js';
import GeneroRepository from '../../../../src/repositories/GeneroRepository.js';
import MarcaRepository from '../../../../src/repositories/MarcaRepository.js';
import { jest } from '@jest/globals';

jest.mock('../../../../src/repositories/SubCategoriaRepository.js');
jest.mock('../../../../src/repositories/GeneroRepository.js');
jest.mock('../../../../src/repositories/MarcaRepository.js'); 

describe('CreateProductoService', () => {
    let mockRepository;
    let service;
    let mockData;

    beforeAll(async () => {
        SubCategoriaRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
        GeneroRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
        MarcaRepository.mockImplementation(() => { return { getById: jest.fn().mockResolvedValue({ id: 1 }) } });
    });

    beforeEach(() => {
        mockRepository = {
            create: jest.fn()
        };
        service = new CreateProductoService(mockRepository);
        mockData = {
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
    });

    it('should create a product successfully', async () => {
        const expectedResult = { id: 1, ...mockData };
        mockRepository.create.mockResolvedValue(expectedResult);

        const result = await service.execute(mockData);

        expect(mockRepository.create).toHaveBeenCalledWith(mockData, null);
        expect(result).toEqual(expectedResult);
    });

    it('should throw error if repository is not provided', () => {
        expect(() => new CreateProductoService()).toThrow('El repositorio es requerido');
    });

    it('should create a product with transaction', async () => {
        const mockTransaction = { id: 'transaction-1' };
        const expectedResult = { id: 1, ...mockData };
        mockRepository.create.mockResolvedValue(expectedResult);

        const result = await service.execute(mockData, mockTransaction);

        expect(mockRepository.create).toHaveBeenCalledWith(mockData, mockTransaction);
        expect(result).toEqual(expectedResult);
    });

    it('should validate data before creating', async () => {
        const invalidData = { ...mockData, precio: 'invalid' };
        
        await expect(service.execute(invalidData))
            .rejects
            .toThrow();
    });
});
