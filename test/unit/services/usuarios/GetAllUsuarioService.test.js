
import GetAllUsuarioService from '../../../../src/services/usuario/GetAllUsuarioService.js';

describe('GetAllUsuarioService', () => {
  let getAllUsuarioService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
    };
    getAllUsuarioService = new GetAllUsuarioService(mockRepository);
  });

  it('should return all usuarios', async () => {
    const usuarios = [{ id: 1, nombres: 'Test1' }, { id: 2, nombres: 'Test2' }];
    mockRepository.getAll.mockResolvedValue(usuarios);

    const result = await getAllUsuarioService.execute();

    expect(mockRepository.getAll).toHaveBeenCalledWith(true, [['nombres', 'ASC']]);
    expect(result).toEqual(usuarios);
  });

  it('should return all usuarios including soft deleted ones when paranoid is false', async () => {
    const usuarios = [{ id: 1, nombres: 'Test1' }, { id: 2, nombres: 'Test2' }];
    mockRepository.getAll.mockResolvedValue(usuarios);

    const result = await getAllUsuarioService.execute(false);

    expect(mockRepository.getAll).toHaveBeenCalledWith(false, [['nombres', 'ASC']]);
    expect(result).toEqual(usuarios);
  });

  it('should throw an error if repository is not provided', () => {
    expect(() => new GetAllUsuarioService()).toThrow('Se requiere un repositorio para GetAllUsuarioService.');
  });
});
