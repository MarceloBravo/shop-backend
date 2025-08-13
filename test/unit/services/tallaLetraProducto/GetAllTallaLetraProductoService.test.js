
import GetAllTallaLetraProductoService from '../../../../src/services/tallaLetraProducto/GetAllTallaLetraProductoService.js';

describe('GetAllTallaLetraProductoService', () => {
  let getAllTallaLetraProductoService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
    };
    getAllTallaLetraProductoService = new GetAllTallaLetraProductoService(mockRepository);
  });

  it('should return all talla letra producto associations', async () => {
    const tallaLetraProductos = [{ id: 1 }, { id: 2 }];
    mockRepository.getAll.mockResolvedValue(tallaLetraProductos);

    const result = await getAllTallaLetraProductoService.execute();

    expect(mockRepository.getAll).toHaveBeenCalledWith(true);
    expect(result).toEqual(tallaLetraProductos);
  });

  it('should return all talla letra producto associations including soft deleted ones when paranoid is false', async () => {
    const tallaLetraProductos = [{ id: 1 }, { id: 2 }];
    mockRepository.getAll.mockResolvedValue(tallaLetraProductos);

    const result = await getAllTallaLetraProductoService.execute(false);

    expect(mockRepository.getAll).toHaveBeenCalledWith(false);
    expect(result).toEqual(tallaLetraProductos);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetAllTallaLetraProductoService()).toThrow('El repositorio es requerido');
  });
});
