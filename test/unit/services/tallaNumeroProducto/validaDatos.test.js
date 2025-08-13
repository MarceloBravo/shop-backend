
import validaDatos from '../../../../src/services/tallaNumeroProducto/validaDatos.js';
import TallaNumeroRepository from '../../../../src/repositories/TallaNumeroRepository.js';
import ProductoRepository from '../../../../src/repositories/ProductoRepository.js';

jest.mock('../../../../src/repositories/TallaNumeroRepository.js');
jest.mock('../../../../src/repositories/ProductoRepository.js');

describe('validaDatos', () => {
  let mockTallaNumeroRepository;
  let mockProductoRepository;

  beforeEach(() => {
    mockTallaNumeroRepository = {
      getById: jest.fn(),
    };
    mockProductoRepository = {
      getById: jest.fn(),
    };
    TallaNumeroRepository.mockImplementation(() => mockTallaNumeroRepository);
    ProductoRepository.mockImplementation(() => mockProductoRepository);
  });

  it('should return data if all validations pass', async () => {
    const data = { producto_id: 1, talla_numerica_id: 1, stock: 10 };
    mockProductoRepository.getById.mockResolvedValue({});
    mockTallaNumeroRepository.getById.mockResolvedValue({});

    const result = await validaDatos(data);

    expect(mockProductoRepository.getById).toHaveBeenCalledWith(1);
    expect(mockTallaNumeroRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(data);
  });

  it('should throw an error if producto_id is invalid or not found', async () => {
    const data = { producto_id: null, talla_numerica_id: 1, stock: 10 };
    mockTallaNumeroRepository.getById.mockResolvedValue({});

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "El número de la talla no es válido o no existe, especifíca un número de talla válido.",
    ]);
  });

  it('should throw an error if talla_numerica_id is invalid or not found', async () => {
    const data = { producto_id: 1, talla_numerica_id: null, stock: 10 };
    mockProductoRepository.getById.mockResolvedValue({});

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "El número de la talla no es válido, especifíca un número de talla válido.",
    ]);
  });

  it('should throw an error with multiple messages if both ids are invalid', async () => {
    const data = { producto_id: null, talla_numerica_id: null, stock: 10 };

    await expect(validaDatos(data)).rejects.toThrow('Datos no válidos:');
    await expect(validaDatos(data)).rejects.toHaveProperty('details', [
      "El número de la talla no es válido o no existe, especifíca un número de talla válido.",
      "El número de la talla no es válido, especifíca un número de talla válido.",
    ]);
  });
});
