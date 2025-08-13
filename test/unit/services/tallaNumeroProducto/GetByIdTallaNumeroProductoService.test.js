
import GetByIdTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/GetByIdTallaNumeroProductoService.js';

describe('GetByIdTallaNumeroProductoService', () => {
  let getByIdTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
    };
    getByIdTallaNumeroProductoService = new GetByIdTallaNumeroProductoService(mockRepository);
  });

  it('should return a talla numero producto association when found', async () => {
    const tallaNumeroProducto = { id: 1, id_producto: 1, id_talla_numerica: 1, stock: 10 };
    mockRepository.getById.mockResolvedValue(tallaNumeroProducto);

    const result = await getByIdTallaNumeroProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
    expect(result).toEqual(tallaNumeroProducto);
  });

  it('should return a talla numero producto association including soft deleted ones when paranoid is false', async () => {
    const tallaNumeroProducto = { id: 1, id_producto: 1, id_talla_numerica: 1, stock: 10 };
    mockRepository.getById.mockResolvedValue(tallaNumeroProducto);

    const result = await getByIdTallaNumeroProductoService.execute(1, false);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(result).toEqual(tallaNumeroProducto);
  });

  it('should throw an error if talla numero producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(getByIdTallaNumeroProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetByIdTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });
});
