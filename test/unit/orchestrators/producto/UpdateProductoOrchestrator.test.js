import UpdateProductoOrchestrator from '../../../../src/orchestrators/producto/UpdateProductoOrchestrator';
import { sequelize } from '../../../../config/database.js';

// Mock de los servicios
jest.mock('../../../../src/services/producto/UpdateProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributoProducto/UpdateAtributoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/colorProducto/UpdateColorProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/dimensionesProducto/UpdateDimensionesProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/materialProducto/UpdateMaterialProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaLetraProducto/UpdateTallaLetraProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaNumeroProducto/UpdateTallaNumeroProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/pesoProducto/UpdatePesoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributo/UpdateAtributoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributoProducto/CreateAtributoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/atributo/CreateAtributoService', () => {
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
jest.mock('../../../../src/services/atributoProducto/HardDeleteAtributoProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/colorProducto/HardDeleteColorProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/dimensionesProducto/HardDeleteDimensionesProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/materialProducto/HardDeleteMaterialProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaLetraProducto/HardDeleteTallaLetraProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/tallaNumeroProducto/HardDeleteTallaNumeroProductoService', () => {
    return jest.fn().mockImplementation(() => {
        return { execute: jest.fn() };
    });
});
jest.mock('../../../../src/services/pesoProducto/HardDeletePesoProductoService', () => {
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

describe('UpdateProductoOrchestrator', () => {
  let updateProductoOrchestrator;

  beforeEach(() => {
    updateProductoOrchestrator = new UpdateProductoOrchestrator();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a product and its relations', async () => {
    const producto_id = 1;
    const updateData = {
      nombre: 'Updated Product',
      precio: 150,
      atributos: [{ id: 1, atributo: { id: 1, nombre: 'Updated Atributo' } }],
      color: { id: 1, color_id: 2 },
      dimensiones: { id: 1, largo: 12, ancho: 12, alto: 12 },
      peso: { id: 1, valor: 1.5, unidad: 'kg' },
      eliminados: {
        atributos: [2],
      },
    };

    // Mock de los retornos de los servicios
    updateProductoOrchestrator.updateProductoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: producto_id, ...updateData }) } });
    updateProductoOrchestrator.updateAtributoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: 1, nombre: 'Updated Atributo' }) } });
    updateProductoOrchestrator.updateAtributoProductoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: 1, producto_id, atributo_id: 1 }) } });
    updateProductoOrchestrator.updateColorProductoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: 1, producto_id, color_id: 2 }) } });
    updateProductoOrchestrator.updateDimensionesProductoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: 1, producto_id, ...updateData.dimensiones }) } });
    updateProductoOrchestrator.updatePesoProductoService.execute.mockResolvedValue({ data: { toJSON: () => ({ id: 1, producto_id, ...updateData.peso }) } });
    updateProductoOrchestrator.hardDeleteAtributoProductoService.execute.mockResolvedValue({ result: true });

    const result = await updateProductoOrchestrator.updateProducto(producto_id, updateData);

    expect(result.actualizados.producto).toBeDefined();
    expect(result.eliminados.atributos).toBeDefined();
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(mockTransaction.rollback).not.toHaveBeenCalled();
  });

  it('should rollback transaction on error during update', async () => {
    const producto_id = 1;
    const updateData = { nombre: 'Updated Product' };
    const error = new Error('Update Error');

    updateProductoOrchestrator.updateProductoService.execute.mockRejectedValue(error);

    await expect(updateProductoOrchestrator.updateProducto(producto_id, updateData)).rejects.toThrow(error);

    expect(mockTransaction.commit).not.toHaveBeenCalled();
    expect(mockTransaction.rollback).toHaveBeenCalled();
  });
});