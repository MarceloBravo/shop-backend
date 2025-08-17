import validaDatos from '../../../../src/services/producto/validaDatos.js';
import SubCategoriaRepository from '../../../../src/repositories/SubCategoriaRepository.js';
import GeneroRepository from '../../../../src/repositories/GeneroRepository.js';
import MarcaRepository from '../../../../src/repositories/MarcaRepository.js';
import { jest } from '@jest/globals';

// Mock the repositories
jest.mock('../../../../src/repositories/SubCategoriaRepository.js');
jest.mock('../../../../src/repositories/GeneroRepository.js');
jest.mock('../../../../src/repositories/MarcaRepository.js');

describe('validaDatos', () => {
    let mockSubCategoriaRepo;
    let mockGeneroRepo;
    let mockMarcaRepo;
    let validData;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();

        // Setup repository mock implementations
        mockSubCategoriaRepo = { getById: jest.fn() };
        mockGeneroRepo = { getById: jest.fn() };
        mockMarcaRepo = { getById: jest.fn() };

        SubCategoriaRepository.mockImplementation(() => mockSubCategoriaRepo);
        GeneroRepository.mockImplementation(() => mockGeneroRepo);
        MarcaRepository.mockImplementation(() => mockMarcaRepo);

        // Setup valid test data
        validData = {
            sku: 'SKU123',
            nombre: 'Test Product',
            descripcion: 'Test Description',
            sub_categoria_id: 1,
            genero_id: 1,
            marca_id: 1,
            precio: 100,
            stock: 10,
            categoria_id: 1
        };

        // Setup successful repository responses
        mockSubCategoriaRepo.getById.mockResolvedValue({ id: 1 });
        mockGeneroRepo.getById.mockResolvedValue({ id: 1 });
        mockMarcaRepo.getById.mockResolvedValue({ id: 1 });
    });

    it('should validate correct data without errors', async () => {
        await expect(validaDatos(validData)).resolves.not.toThrow();
    });

    it('should throw error for invalid SKU', async () => {
        const invalidData = { ...validData, sku: '' };
        await expect(validaDatos(invalidData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for invalid nombre', async () => {
        const invalidData = { ...validData, nombre: '' };
        await expect(validaDatos(invalidData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for invalid descripcion', async () => {
        const invalidData = { ...validData, descripcion: '' };
        await expect(validaDatos(invalidData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for non-existent sub_categoria_id', async () => {
        mockSubCategoriaRepo.getById.mockResolvedValue(null);
        await expect(validaDatos(validData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for non-existent genero_id', async () => {
        mockGeneroRepo.getById.mockResolvedValue(null);
        await expect(validaDatos(validData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for non-existent marca_id', async () => {
        mockMarcaRepo.getById.mockResolvedValue(null);
        await expect(validaDatos(validData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error for invalid precio', async () => {
        const invalidData = { ...validData, precio: -1 };
        await expect(validaDatos(invalidData))
            .rejects
            .toThrow('Datos no válidos:');
    });

    it('should throw error with all validation messages for completely invalid data', async () => {
        const invalidData = {
            sku: '',
            nombre: '',
            descripcion: '',
            sub_categoria_id: null,
            genero_id: null,
            marca_id: null,
            precio: -1
        };

        try {
            await validaDatos(invalidData);
            fail('Expected validation to throw an error');
        } catch (error) {
            expect(error.code).toBe(400);
            expect(error.details).toHaveLength(7); // Should have all validation errors
        }
    });
});
