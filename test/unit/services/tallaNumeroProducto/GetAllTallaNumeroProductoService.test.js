
import GetAllTallaNumeroProductoService from '../../../../src/services/tallaNumeroProducto/GetAllTallaNumeroProductoService.js';

describe('GetAllTallaNumeroProductoService', () => {
  let getAllTallaNumeroProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
    };
    getAllTallaNumeroProductoService = new GetAllTallaNumeroProductoService(mockRepository);
  });

  it('should return all talla numero producto associations', async () => {
    const tallaNumeroProductos = [{ id: 1 }, { id: 2 }];
    mockRepository.getAll.mockResolvedValue(tallaNumeroProductos);

    const result = await getAllTallaNumeroProductoService.execute();

    expect(mockRepository.getAll).toHaveBeenCalledWith(true);
    expect(result).toEqual(tallaNumeroProductos);
  });

  it('should return all talla numero producto associations including soft deleted ones when paranoid is false', async () => {
    const tallaNumeroProductos = [{ id: 1 }, { id: 2 }];
    mockRepository.getAll.mockResolvedValue(tallaNumeroProductos);

    const result = await getAllTallaNumeroProductoService.execute(false);

    expect(mockRepository.getAll).toHaveBeenCalledWith(false);
    expect(result).toEqual(tallaNumeroProductos);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetAllTallaNumeroProductoService()).toThrow('El repositorio es requerido');
  });
});
