
import validaDatos from '../../../../src/services/tallaLetraProducto/validaDatos.js';
import TallaLetraRepository from '../../../../src/repositories/TallaLetraRepository.js';
import ProductoRepository from '../../../../src/repositories/ProductoRepository.js';

jest.mock('../../../../src/repositories/TallaLetraRepository.js');
jest.mock('../../../../src/repositories/ProductoRepository.js');

describe('validaDatos', () => {
  let mockTallaLetraRepository;
  let mockProductoRepository;

  beforeEach(() => {
    mockTallaLetraRepository = {
      getById: jest.fn(),
    };
    mockProductoRepository = {
      getById: jest.fn(),
    };
    TallaLetraRepository.mockImplementation(() => mockTallaLetraRepository);
    ProductoRepository.mockImplementation(() => mockProductoRepository);
  });

  it('should return data if all validations pass', async () => {
    const data = { producto_id: 1, talla_letra_id: 1, stock: 10 };
    mockProductoRepository.getById.mockResolvedValue({});
    mockTallaLetraRepository.getById.mockResolvedValue({});

    const result = await validaDatos(data);

    expect(mockProductoRepository.getById).toHaveBeenCalledWith(1);
    expect(mockTallaLetraRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(data);
  });

  it('should throw an error if producto_id is invalid or not found', async () => {
    const data = { producto_id: null, talla_letra_id: 1, stock: 10 };
    mockTallaLetraRepository.getById.mockResolvedValue({});

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "La letra de la talla no es válida o no existe, especifíca una Letra de talla válida.",
    ]);
  });

  it('should throw an error if talla_letra_id is invalid or not found', async () => {
    const data = { producto_id: 1, talla_letra_id: null, stock: 10 };
    mockProductoRepository.getById.mockResolvedValue({});

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "La letra de la talla no es válida, especifíca una Letra de talla válida.",
    ]);
  });

  it('should throw an error with multiple messages if both ids are invalid', async () => {
    const data = { producto_id: null, talla_letra_id: null, stock: 10 };

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "La letra de la talla no es válida o no existe, especifíca una Letra de talla válida.",
      "La letra de la talla no es válida, especifíca una Letra de talla válida.",
    ]);
  });
});
