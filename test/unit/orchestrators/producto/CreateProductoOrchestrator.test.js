
import CreateProductoOrchestrator from '../../../../src/orchestrators/producto/CreateProductoOrchestrator';
import { sequelize } from '../../../../config/database.js';
import CreateProductoService from '../../../../src/services/producto/CreateProductoService';
import CreateAtributoProductoService from '../../../../src/services/atributoProducto/CreateAtributoProductoService';
import CreateColorProductoService from '../../../../src/services/colorProducto/CreateColorProductoService';
import CreateMaterialProductoService from '../../../../src/services/materialProducto/CreateMaterialProductoService';
import CreateTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/CreateTallaLetraProductoService';
import CreateTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/CreateTallaNumeroProductoService';
import CreatePesoProductoService from '../../../../src/services/pesoProducto/CreatePesoProductoService';
import CreateAtributoService from '../../../../src/services/atributo/CreateAtributoService';
import CreateDimensionesProductoService from '../../../../src/services/dimensionesProducto/CreateDimensionesProductoService';

// Mock de los servicios
jest.mock('../../../../src/services/producto/CreateProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributoProducto/CreateAtributoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/colorProducto/CreateColorProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/materialProducto/CreateMaterialProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaLetraProducto/CreateTallaLetraProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaNumeroProducto/CreateTallaNumeroProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/pesoProducto/CreatePesoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributo/CreateAtributoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/dimensionesProducto/CreateDimensionesProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});

// Mock de la transacción de Sequelize
const mockTransaction = {
  commit: jest.fn(),
  rollback: jest.fn(),
};

sequelize.transaction = jest.fn(() => Promise.resolve(mockTransaction));

describe('CreateProductoOrchestrator', () => {
  let createProductoOrchestrator;

  beforeEach(() => {
    createProductoOrchestrator = new CreateProductoOrchestrator();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product with all its relations', async () => {
    const productoData = {
      sku: 'TEST-SKU',
      nombre: 'Test Product',
      descripcion: 'Test Description',
      sub_categoria_id: 1,
      genero_id: 1,
      marca_id: 1,
      precio: 100,
      atributos: [{ nombre: 'Test Atributo' }],
      color_id: 1,
      dimensiones: { largo: 10, ancho: 10, alto: 10 },
      material_id: [1],
      talla_letra_id: [1],
      talla_numerica_id: [1],
      peso: { valor: 1, unidad: 'kg' },
    };

    const mockProducto = { id: 1, ...productoData };
    const mockAtributo = { id: 1, nombre: 'Test Atributo' };

    createProductoOrchestrator.createProductoService.execute.mockResolvedValue(mockProducto);
    createProductoOrchestrator.createAtributoService.execute.mockResolvedValue(mockAtributo);
    createProductoOrchestrator.createAtributoProductoService.execute.mockResolvedValue({ producto_id: 1, atributo_id: 1 });
    createProductoOrchestrator.createColorProductoService.execute.mockResolvedValue({ producto_id: 1, color_id: 1 });
    createProductoOrchestrator.createDimensionesProductoService.execute.mockResolvedValue({ id: 1, producto_id: 1, ...productoData.dimensiones });
    createProductoOrchestrator.createMaterialProductoService.execute.mockResolvedValue({ producto_id: 1, material_id: 1 });
    createProductoOrchestrator.createTallaLetraProductoService.execute.mockResolvedValue({ producto_id: 1, talla_letra_id: 1 });
    createProductoOrchestrator.createTallaNumeroProductoService.execute.mockResolvedValue({ producto_id: 1, talla_numerica_id: 1 });
    createProductoOrchestrator.createPesoProductoService.execute.mockResolvedValue({ id: 1, producto_id: 1, ...productoData.peso });

    const result = await createProductoOrchestrator.createProducto(productoData);

    expect(result.producto).toEqual(mockProducto);
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(mockTransaction.rollback).not.toHaveBeenCalled();
  });

  it('should rollback transaction on error', async () => {
    const productoData = {
        sku: 'TEST-SKU',
        nombre: 'Test Product',
        descripcion: 'Test Description',
        sub_categoria_id: 1,
        genero_id: 1,
        marca_id: 1,
        precio: 100,
      };

    const error = new Error('Test Error');
    createProductoOrchestrator.createProductoService.execute.mockRejectedValue(error);

    await expect(createProductoOrchestrator.createProducto(productoData)).rejects.toThrow(error);

    expect(mockTransaction.commit).not.toHaveBeenCalled();
    expect(mockTransaction.rollback).toHaveBeenCalled();
  });
});
