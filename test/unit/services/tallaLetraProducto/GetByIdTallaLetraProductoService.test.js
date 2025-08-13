
import GetByIdTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/GetByIdTallaLetraProductoService.js';

describe('GetByIdTallaLetraProductoService', () => {
  let getByIdTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getById: jest.fn(),
    };
    getByIdTallaLetraProductoService = new GetByIdTallaLetraProductoService(mockRepository);
  });

  it('should return a talla letra producto association when found', async () => {
    const tallaLetraProducto = { id: 1, id_producto: 1, id_talla_letra: 1, stock: 10 };
    mockRepository.getById.mockResolvedValue(tallaLetraProducto);

    const result = await getByIdTallaLetraProductoService.execute(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, true);
    expect(result).toEqual(tallaLetraProducto);
  });

  it('should return a talla letra producto association including soft deleted ones when paranoid is false', async () => {
    const tallaLetraProducto = { id: 1, id_producto: 1, id_talla_letra: 1, stock: 10 };
    mockRepository.getById.mockResolvedValue(tallaLetraProducto);

    const result = await getByIdTallaLetraProductoService.execute(1, false);

    expect(mockRepository.getById).toHaveBeenCalledWith(1, false);
    expect(result).toEqual(tallaLetraProducto);
  });

  it('should throw an error if talla letra producto association is not found', async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(getByIdTallaLetraProductoService.execute(999)).rejects.toThrow('Asociación no encontrada');
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetByIdTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });
});
